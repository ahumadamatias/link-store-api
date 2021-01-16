import express, { Application, Router } from "express";
import morgan from "morgan";
import { routes_bank } from "./routes/routes-bank";

export class App {
    private app: Application;

    public constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
    }

    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

    public getApp(): Application {
        return this.app;
    }

    public getRoutes(): void {
        routes_bank.forEach(async(route: Router) => {
            await this.app.use('/api', route)
        })
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    private middlewares(): void {
        this.app.use(morgan('dev'));
    }
}