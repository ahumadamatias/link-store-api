import express, { Application } from "express";
import morgan from "morgan";

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

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    private middlewares(): void {
        this.app.use(morgan('dev'));
    }
}