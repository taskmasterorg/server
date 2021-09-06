import { authCredentials } from './interface';
import { User } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { RedisClient } from 'redis';

/**
 * Implements the authentication functionality.
 */
class AuthService {

    private static instance: AuthService;
    private errorMessageName: string = 'Firstname and lastname are required for signing up.';
    private errorMessageCredFormat: string = 'Invalid email/password format. (Password: Minimum eight characters, at least one letter and one number)';
    private errorMessageEmail: string = 'Email exists in the database.';
    private errorMessageLogin: string = 'Invalid email/password combination.';
    private constructor() {}

    /**
     * Follows the singleton pattern.
     * @returns an instance of this service
     */
    public static getInstance(): AuthService {

        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    /**
     * Adds user to the database.
     * @param credentials 
     * @returns An error if it occurs
     */
    public async signup(credentials: authCredentials): Promise<Error | void> {

        if (!credentials.firstName || !credentials.lastName) {
            
            return new Error(this.errorMessageName);
        }

        if (!this.validCredentials(credentials.email, credentials.password)) {

            return new Error(this.errorMessageCredFormat);
        }

        if (await this.emailExists(credentials.email)) {

            return new Error(this.errorMessageEmail);
        }

        try {
            await this.insertUser(credentials);
        } catch(err) {
            return AuthService.createError(err);
        }
    }

    /**
     * Creates a JWT and returns it.
     * @param credentials 
     * @returns An error if it occurs, a JWT otherwise.
     */
    public async login(credentials: authCredentials): Promise<Error | string> {

        if (!(await this.emailExists(credentials.email)) || 
            !(await this.comparePassword(credentials))) {
                return new Error(this.errorMessageLogin);
        }

        const id: string | Error = await this.getUserId(credentials);

        if (typeof id === 'string') {
            return this.createJWT(id);
        }

        return id;
    }

    /**
     * Does what you expect. JWT is invalid if found in Redis blacklist.
     * @param token The JWT
     * @returns An error if it occurs, decoded content otherwise.
     */
    public async verifyAndDecodeJWT(token: string, memory: RedisClient): Promise<Error | any> {

        if (memory.get(token)) {

            return new Error('Invalid token');
        }

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            return decoded;
        } catch (err) {
            return AuthService.createError(err);
        }
    }

    /**
     * Kills user's JWT.
     * @param memory Instance of RedisClient
     * @param token The JWT
     */
    public async logout(token: string, memory: RedisClient): Promise<void> {

        this.blacklistJWT(token, memory);
    }

    private static createError(err: string | Error | unknown): Error {

        if (typeof err === "string") {
            return new Error(err);
        }
        if (err instanceof Error) {
            return err;
        }
        return new Error('Something went wrong!');
    }

    private blacklistJWT(token: string, memory: RedisClient): void {

        memory.set(token, 'true');
    }

    private validCredentials(email: string, password: string): boolean {

        //eslint-disable-next-line
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        //eslint-disable-next-line
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        return regexEmail.test(email) && regexPassword.test(password);
    }

    private async emailExists(email: string): Promise<boolean> {

        const arr = await User.find({ email });
        return (arr.length > 0);
    }

    private async insertUser(credentials: authCredentials): Promise<Error | User> {

        credentials.password = await this.hashPassword(credentials.password);
        const user  = User.create(credentials);
        try {
            const saved = user.save();
            return saved;
        } catch(err) {
            return AuthService.createError(err);
        }
    }

    private async comparePassword(credentials: authCredentials): Promise<boolean> {

        const user: User | undefined = await User.findOne(credentials);
        
        if (user === undefined) {
            return false;
        }
        
        const isGood = await bcrypt.compare(credentials.password, user.password);
        return isGood;
    }

    private async hashPassword(password: string): Promise<string> {

        return bcrypt.hash(password, 10);
    }

    private async getUserId(credentials: authCredentials): Promise<Error | string> {

        const user: User | undefined = await User.findOne(credentials);
        
        if (user === undefined) {
            return new Error('User does not exist.');
        }

        return user.id;
    }

    private createJWT(userId: string): string {
        
        const TOKEN_AGE = 3 * 24 * 60 * 60;
        const token = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: TOKEN_AGE });
        return token;
    }
}

export default AuthService;
