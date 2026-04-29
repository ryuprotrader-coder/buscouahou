import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Loader2, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import { signUp } from '../../lib/auth';

type Role = 'cliente' | 'lojista';

export default function RegisterForm() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('cliente');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordStrength = (() => {
    if (password.length === 0) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-400', 'bg-green-400'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    const { error } = await signUp({ email, password, nome, sobrenome, role });

    if (error) {
      setError(
        error.message.includes('already registered')
          ? 'Este e-mail já está cadastrado. Tente fazer login.'
          : 'Erro ao criar conta. Verifique os dados e tente novamente.'
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Conta criada!</h2>
          <p className="text-white/60 text-sm mb-6">
            Enviamos um link de confirmação para <span className="text-orange-400 font-medium">{email}</span>.
            <br />Verifique sua caixa de entrada para ativar sua conta.
          </p>
          <a
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200 hover:from-orange-600 hover:to-orange-700"
          >
            Ir para o login
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 mb-4">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Criar sua conta</h1>
            <p className="text-white/60 text-sm mt-1">Junte-se ao Mais Melhor</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Erro */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-xl p-3 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tipo de conta */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Tipo de conta</label>
              <div className="grid grid-cols-2 gap-3">
                {(['cliente', 'lojista'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 capitalize ${
                      role === r
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-white/5 border-white/20 text-white/50 hover:border-white/40'
                    }`}
                  >
                    {r === 'cliente' ? '🛒 Cliente' : '🏪 Lojista'}
                  </button>
                ))}
              </div>
            </div>

            {/* Nome + Sobrenome */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 text-xs font-medium mb-1.5">Nome *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    id="reg-nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="João"
                    className="w-full bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-white/30 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-xs font-medium mb-1.5">Sobrenome</label>
                <input
                  id="reg-sobrenome"
                  type="text"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  placeholder="Silva"
                  className="w-full bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl px-3 py-2.5 text-white placeholder-white/30 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-1.5">E-mail *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="reg-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-1.5">Senha *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-white/10 border border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/30 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Força da senha */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= passwordStrength ? strengthColor[passwordStrength] : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/40">
                    Senha: <span className="text-white/60">{strengthLabel[passwordStrength]}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Botão */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3.5 transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 mt-1"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Criar conta grátis
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-white/60 text-sm mt-6">
            Já tem conta?{' '}
            <a
              href="/auth/login"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Entrar
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
