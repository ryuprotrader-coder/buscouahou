import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { signIn } from '../../lib/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await signIn({ email, password });

    if (error) {
      setError(
        error.message.includes('Invalid login')
          ? 'E-mail ou senha incorretos. Tente novamente.'
          : error.message.includes('Email not confirmed')
            ? 'Confirme seu e-mail antes de entrar.'
            : 'Ocorreu um erro ao entrar. Tente novamente.'
      );
      setLoading(false);
      return;
    }

    // Redirecionar baseado na role ou parâmetro explícito
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect');

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      const role = data?.user?.role ?? 'cliente';
      if (role === 'lojista' || role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/client';
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto"
    >
      {/* Card glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Glow laranja no topo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Logo / título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 mb-4">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Bem-vindo de volta!</h1>
            <p className="text-white/60 text-sm mt-1">Entre com sua conta Mais Melhor</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Erro */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-xl p-3 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* E-mail */}
            <div className="group">
              <label className="block text-white/70 text-sm font-medium mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-orange-400 transition-colors" />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="group">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-white/70 text-sm font-medium">Senha</label>
                <a
                  href="/auth/recuperar-senha"
                  className="text-orange-400 hover:text-orange-300 text-xs transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-orange-400 transition-colors" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/30 outline-none transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botão */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3.5 transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Entrar
                </>
              )}
            </motion.button>
          </form>

          {/* Separador */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Link para registro */}
          <p className="text-center text-white/60 text-sm">
            Não tem conta?{' '}
            <a
              href="/auth/registro"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Criar conta grátis
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
