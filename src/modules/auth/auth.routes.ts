import { Router } from "express";
import { AuthService } from "./auth.service";
import { UserService } from "../../modules/users/users.service";
import { authenticateToken } from "../../middlewares/auth.middleware";

export class AuthRoutes {
  public router: Router;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    this.router.post("/signin", async (req, res) => {
      try {
        const result = await this.authService.signin(req.body);
        res.json(result);
      } catch (err: any) {
        res.status(401).json({ message: err.message || "Invalid Credentials" });
      }
    });
    this.router.get("/userMe", authenticateToken, async (req, res) => {
      try {
        const { email } = req.user as { email: string };
        const user = await this.userService.getUserByEmail(email);
        res.json(user);
      } catch (err: any) {
        res.status(500).json({ message: err.message || "Internal Server Error" });
      }
    });
  }
}

export default new AuthRoutes(new AuthService(), new UserService()).router;
