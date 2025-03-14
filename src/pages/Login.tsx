
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Setup canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Generate color palette
    const colors = [
      "rgba(125, 137, 187, 0.25)",
      "rgba(147, 160, 204, 0.25)",
      "rgba(172, 180, 212, 0.25)",
      "rgba(200, 207, 227, 0.25)",
      "rgba(228, 223, 236, 0.25)",
    ];

    // Create bubbles
    const bubbles: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
    }[] = [];

    const bubbleCount = Math.min(window.innerWidth / 40, 18);

    for (let i = 0; i < bubbleCount; i++) {
      const radius = Math.random() * 120 + 60;
      bubbles.push({
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: Math.random() * (canvas.height - radius * 2) + radius,
        radius: radius,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();

        // Update position
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Boundary checking
        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) {
          bubble.dx = -bubble.dx;
        }

        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) {
          bubble.dy = -bubble.dy;
        }
      });
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      setIsLoading(true);
      await login(username, password);
      // The redirect happens via the useEffect that watches isAuthenticated
    } catch (error) {
      console.error("Login error:", error);
      // Toast is shown in the login function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Main background */}
      <div className="gradient-background"></div>

      {/* Animated bubbles canvas */}
      <canvas 
        ref={canvasRef} 
        id="glassCanvas" 
        aria-hidden="true"
        className="fixed inset-0 z-0"
      />

      {/* Login container */}
      <div 
        className="w-full max-w-md glass rounded-2xl p-8 z-10 transform transition-all duration-500 
                  hover:translate-y-[-5px] hover:shadow-xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-2">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-secondary to-primary p-2 
                          flex items-center justify-center shadow-lg mx-auto animate-float">
              <svg 
                viewBox="0 0 24 24" 
                width="32" 
                height="32" 
                stroke="white" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Bem-vindo</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full"></div>
          <p className="text-sm text-muted-foreground mt-4">Sistema de Gestão de Estoque</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Digite seu usuário"
                required
                autoComplete="username"
                className="input-field pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                required
                autoComplete="current-password"
                className="input-field pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full mt-6 h-12 relative overflow-hidden rounded-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="spinner mr-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" opacity="0.25" className="stroke-current"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10" opacity="1" className="stroke-current"></path>
                </svg>
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </button>

          {/* Demo credentials notice */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Para demonstração, use: 
              <span className="font-medium text-primary ml-1">
                demo / demo
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
