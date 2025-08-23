export default function Login() {
    return (
        <>
            <div className="login-container">
                <h1 className="text-gradient">MDNOTES</h1>
                <h2>Organised note taking made easy</h2>
                <p>
                    Build your very own archive of easily navigated and indexed
                    informaion and notes
                </p>
                <div className="full-line"></div>
                <h6>Sign in</h6>
                <div>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" placeholder="********" />
                    <button className="submit-btn">
                        <h6>Submit</h6>
                    </button>
                    <div className="secondary-btns-container">
                        <button className="card-button-secondary">
                            <small>Log in</small>
                        </button>
                        <button className="card-button-secondary">
                            <small>Forgot password?</small>
                        </button>
                    </div>
                    <div className="full-line"></div>
                    <footer>
                        <a
                            target="_blank"
                            href="https://github.com/Tarasdeveloper"
                        >
                            <img
                                src="https://avatars.githubusercontent.com/u/107717399?v=4"
                                alt="github-logo"
                            />
                            <h6>@Tarasdeveloper</h6>
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </footer>
                </div>
            </div>
        </>
    );
}
