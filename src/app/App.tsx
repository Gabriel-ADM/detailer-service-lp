import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logo from "@/imports/image-2.png";
import servicesImg from "@/imports/image.png";
import bannerImg from "@/imports/image-1.png";
import {
  MapPin,
  Phone,
  Instagram,
  Clock,
  Shield,
  Zap,
  Star,
  ChevronDown,
  CheckCircle2,
  Car,
  Bike,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

const CHECKOUT_URL =
  "https://checkout.infinitepay.io/guilhermepinho?lenc=G9EAIB2Jsa2DLaLJfFhcjdLUzQbJg9bWtIsC2f-tDTTOA57DA00dRzrg1fIRroG8Xkd-t9AYkdHJgXPrK2hJkGgUeealEjjHUvTgtHtvZunV9oXpQpFhOV4QJz_npVYBGwUoTHJYTIfUC3TbRv9FMC5nacoEqCMmTPN1mKpZL6fyQhfmEUy92E1Gtuzqb9DIkWP-uLxbbp9inOHA6HlzAd7CG4THlLO8FKyFFUlVAg.v1.83374ae1fef887ac";

const services = [
  {
    id: "basica",
    badge: "MAIS POPULAR",
    icon: "💧",
    name: "Lavagem Básica",
    time: "2h",
    priceRange: "R$ 80",
    color: "from-violet-600/20 to-violet-900/10",
    borderColor: "border-violet-500/30",
    badgeColor: "bg-violet-600",
    features: [
      "Pré-lavagem com V-Mol",
      "Limpeza da pintura e carenagens",
      "Limpeza das rodas e pneus",
      "Painel, guidão e comandos",
      "Banco e escapamento externo",
      "Lavagem completa",
      "Aplicação de Darken nos pneus",
    ],
    highlight: "Ideal para manutenção do dia a dia.",
  },
  {
    id: "detalhada",
    badge: null,
    icon: "⭐",
    name: "Lavagem Detalhada",
    time: "4h",
    priceRange: "R$ 110",
    color: "from-purple-600/20 to-purple-900/10",
    borderColor: "border-purple-400/40",
    badgeColor: "bg-purple-500",
    features: [
      "Tudo da Lavagem Básica",
      "Limpeza detalhada de rodas, aros, discos e pinças",
      "Limpeza completa do motor e chassi",
      "Suspensões e mesas",
      "Plásticos, embreagens e cantos difíceis",
      "Acabamento refinado",
      "Aplicação de Shiny nos pneus",
    ],
    highlight: "Limpeza profunda e atenção aos detalhes.",
  },
  {
    id: "premium",
    badge: "PREMIUM",
    icon: "💎",
    name: "Lavagem Premium",
    time: "2 visitas · 4h cada",
    priceRange: "R$ 180",
    sessions: [
      { label: "1ª Visita", desc: "Lavagem externa completa" },
      { label: "2ª Visita", desc: "Detalhamento interno" },
    ],
    color: "from-fuchsia-600/25 to-purple-900/15",
    borderColor: "border-fuchsia-400/50",
    badgeColor: "bg-fuchsia-600",
    features: [
      "Tudo da Lavagem Detalhada",
      "Descontaminação leve da pintura",
      "Blend Vonix para brilho e proteção",
      "Revitalização dos plásticos com Intense",
      "Aplicação de Darken nos pneus",
      "Lubrificação da corrente",
      "Acabamento de metas e escapamento",
    ],
    highlight: "Proteção, brilho intenso e acabamento premium.",
  },
  {
    id: "detalhamento",
    badge: "PROFISSIONAL",
    icon: "🏆",
    name: "Detalhamento Premium",
    time: "4h – 7h",
    priceRange: "R$ 250 – R$ 350",
    color: "from-amber-600/15 to-orange-900/10",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-600",
    features: [
      "Tudo da Lavagem Premium",
      "Descontaminação química completa",
      "Removedor de partículas ferrosas",
      "Removedor de piche e cola",
      "Clay Bar Vonix",
      "Polimento comercial para retirar marcas leves",
      "Limpeza profunda do motor, chassi e componentes",
      "Proteção completa da pintura e plásticos",
      "Acabamento refinado em todos os detalhes",
    ],
    highlight: "Recuperação estética completa e aparência de exposição.",
  },
  {
    id: "blackwhite",
    badge: "TÉCNICO",
    icon: "🛡️",
    name: "Black & White + Encerramento Técnico",
    time: "2h30 – 4h",
    priceRange: "R$ 180 – R$ 280",
    color: "from-slate-600/20 to-slate-900/15",
    borderColor: "border-slate-400/30",
    badgeColor: "bg-slate-600",
    features: [
      "Lavagem detalhada completa",
      "Descontaminação da pintura",
      "Aplicação do Black ou White Vonix",
      "Clay Bar Vonix",
      "Encerramento técnico",
      "Revitalização dos plásticos",
      "Aplicação de Darken no pneu",
      "Acabamento de brilho profundo",
    ],
    highlight: "Brilho intenso, proteção prolongada e visual impecável.",
  },
];

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento a Domicílio",
    desc: "A estética vai até você. Sem sair de casa ou do trabalho.",
  },
  {
    icon: Zap,
    title: "Praticidade & Comodidade",
    desc: "Você cuida da sua rotina, nós cuidamos da sua moto.",
  },
  {
    icon: Shield,
    title: "Cuidado & Proteção",
    desc: "Produtos premium profissionais especializados.",
  },
  {
    icon: Star,
    title: "Resultados Profissionais",
    desc: "Qualidade que você vê, proteção que sua moto sente.",
  },
];

type Service = {
  id: string;
  badge: string | null;
  icon: string;
  name: string;
  time: string;
  priceRange: string;
  sessions?: { label: string; desc: string }[];
  color: string;
  borderColor: string;
  badgeColor: string;
  features: string[];
  highlight?: string;
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<"moto" | "carro">("moto");
  const [selectedService, setSelectedService] = useState<string>("basica");
  const [lightMode, setLightMode] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("light-forced", lightMode);
  }, [lightMode]);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleCheckout = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const selectedServiceData = services.find((s) => s.id === selectedService) as Service | undefined;

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        lightMode
          ? "bg-gray-50 text-gray-900"
          : "bg-background text-foreground"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${lightMode ? "bg-white/95 border-gray-200 shadow-sm" : "bg-background/90 border-border"}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={logo}
              alt="Estética Pinho Delivery logo"
              className="h-10 w-10 object-contain"
            />
            <span
              className={`font-bold text-lg tracking-wide hidden sm:block ${lightMode ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              ESTÉTICA <span className="text-primary">PINHO</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={scrollToServices} className="hover:text-primary transition-colors">
              Serviços
            </button>
            <a href="#beneficios" className="hover:text-primary transition-colors">
              Benefícios
            </a>
            <a href="#contato" className="hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Light mode toggle for sunny conditions */}
            <button
              onClick={() => setLightMode(!lightMode)}
              title={lightMode ? "Modo escuro" : "Modo claro (para ambientes ensolarados)"}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                lightMode
                  ? "bg-amber-400 border-amber-400 text-amber-900 shadow-lg shadow-amber-400/30"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {lightMode ? <Sun size={14} /> : <Moon size={14} />}
              <span className="hidden sm:inline">{lightMode ? "Claro" : "Escuro"}</span>
            </button>
            <a
              href="https://wa.me/5561994450329"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-accent transition-colors text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              <Phone size={14} /> Ligar
            </a>
            <button
              className="md:hidden p-1"
              style={{ color: lightMode ? "#1a1a2e" : "white" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-4 text-sm">
            <button onClick={scrollToServices} className="text-left text-muted-foreground hover:text-primary">
              Serviços
            </button>
            <a href="#beneficios" className="text-muted-foreground hover:text-primary" onClick={() => setMenuOpen(false)}>
              Benefícios
            </a>
            <a href="#contato" className="text-muted-foreground hover:text-primary" onClick={() => setMenuOpen(false)}>
              Contato
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className={`relative min-h-screen flex items-center pt-16 overflow-hidden transition-colors duration-300 ${lightMode ? "bg-white" : ""}`}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${lightMode ? "bg-purple-100" : "bg-primary/10"}`} />
          <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] ${lightMode ? "bg-purple-50" : "bg-accent/8"}`} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 text-primary text-sm font-medium">
              <MapPin size={14} />
              Brasília – DF · Delivery
            </div>

            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-none ${lightMode ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ESTÉTICA
              <br />
              <span className="text-primary">PINHO</span>
              <br />
              <span className="text-3xl sm:text-4xl font-bold text-muted-foreground tracking-widest">
                DELIVERY
              </span>
            </h1>

            <p className={`text-lg leading-relaxed max-w-md ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>
              <span className={`font-semibold ${lightMode ? "text-gray-900" : "text-white"}`}>A estética vai até você.</span>{" "}
              Lavagens e detalhamentos premium para motos e carros — sob demanda ou por assinatura — sem sair de casa.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToServices}
                className="flex items-center gap-2 bg-primary hover:bg-accent transition-all duration-300 text-white px-6 py-3 rounded-xl font-bold text-base shadow-lg shadow-primary/30 hover:shadow-accent/40 hover:scale-105"
              >
                <Sparkles size={18} />
                Ver Serviços
                <ArrowRight size={16} />
              </button>
              <a
                href="https://wa.me/5561994450329"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-primary/40 hover:border-primary text-primary hover:bg-primary/10 transition-all duration-300 px-6 py-3 rounded-xl font-bold text-base"
              >
                <Phone size={16} />
                61 99445-0329
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-2">
              {[
                { label: "Serviços", value: "5+" },
                { label: "Sob Demanda", value: "✓" },
                { label: "Assinatura", value: "✓" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right logo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110" />
              <ImageWithFallback
                src={logo}
                alt="Estética Pinho Delivery - moto com entregador"
                className="relative w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToServices}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest">Serviços</span>
          <ChevronDown size={20} />
        </button>
      </section>

      {/* VEHICLE TOGGLE + SERVICES */}
      <section
        id="servicos"
        ref={servicesRef as React.RefObject<HTMLElement>}
        className={`py-20 px-4 relative transition-colors duration-300 ${lightMode ? "bg-gray-50" : ""}`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10 space-y-3">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Nossos Serviços</p>
            <h2
              className={`text-4xl sm:text-5xl font-black ${lightMode ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              LAVAGENS &amp; DETALHAMENTOS
            </h2>
            <p className={`max-w-lg mx-auto ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>
              Escolha o serviço ideal para sua moto ou carro. Cada pacote foi desenvolvido com produtos premium Vonix.
            </p>
          </div>

          {/* Vehicle toggle */}
          <div className="flex justify-center mb-10">
            <div className={`inline-flex rounded-xl p-1 gap-1 border ${lightMode ? "bg-white border-gray-200 shadow-sm" : "bg-card border-border"}`}>
              <button
                onClick={() => setSelectedVehicle("moto")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedVehicle === "moto"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <Bike size={16} /> Moto
              </button>
              <button
                onClick={() => setSelectedVehicle("carro")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedVehicle === "carro"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <Car size={16} /> Carro
              </button>
            </div>
          </div>

          {/* Service cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(services as Service[]).map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`relative cursor-pointer rounded-2xl border p-6 bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 ${
                  lightMode
                    ? "bg-white border-gray-200 shadow-sm"
                    : `${service.color} ${service.borderColor}`
                } ${
                  selectedService === service.id
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02] shadow-xl shadow-primary/20"
                    : ""
                }`}
              >
                {service.badge && (
                  <span
                    className={`absolute -top-3 left-5 text-white text-xs font-bold px-3 py-1 rounded-full ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                )}

                {selectedService === service.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 size={20} className="text-primary" />
                  </div>
                )}

                <div className="text-3xl mb-3">{service.icon}</div>

                <h3
                  className={`text-xl font-black mb-1 ${lightMode ? "text-gray-900" : "text-white"}`}
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {service.name}
                </h3>

                <div className={`flex items-center gap-2 text-sm mb-3 ${lightMode ? "text-gray-500" : "text-muted-foreground"}`}>
                  <Clock size={13} />
                  <span>{service.time}</span>
                </div>

                <div
                  className="text-2xl font-black text-primary mb-3"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {service.priceRange}
                  {selectedVehicle === "carro" && (
                    <span className={`text-xs font-normal ml-1 ${lightMode ? "text-gray-400" : "text-muted-foreground"}`}>(carro)</span>
                  )}
                </div>

                {/* Sessions badge for Premium */}
                {service.sessions && (
                  <div className="flex gap-2 mb-3">
                    {service.sessions.map((session) => (
                      <div
                        key={session.label}
                        className={`flex-1 rounded-lg px-2 py-1.5 text-center border ${
                          lightMode
                            ? "bg-purple-50 border-purple-200"
                            : "bg-primary/10 border-primary/20"
                        }`}
                      >
                        <div className="text-primary text-xs font-black">{session.label}</div>
                        <div className={`text-xs leading-tight mt-0.5 ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>{session.desc}</div>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="space-y-1.5 mb-4">
                  {service.features.slice(0, 5).map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>
                      <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {service.features.length > 5 && (
                    <li className="text-xs text-primary font-medium mt-1">
                      +{service.features.length - 5} itens inclusos
                    </li>
                  )}
                </ul>

                {service.highlight && (
                  <p className={`text-xs italic border-t pt-3 ${lightMode ? "text-purple-600 border-gray-200" : "text-primary/80 border-border"}`}>
                    {service.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Selected service CTA */}
          <div className={`mt-12 border border-primary/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 ${lightMode ? "bg-white shadow-md" : "bg-gradient-to-r from-card to-secondary"}`}>
            <div>
              <p className={`text-sm mb-1 ${lightMode ? "text-gray-500" : "text-muted-foreground"}`}>Serviço selecionado</p>
              <h3
                className={`text-2xl font-black ${lightMode ? "text-gray-900" : "text-white"}`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {selectedServiceData?.name}
              </h3>
              <p className="text-primary font-bold text-lg">{selectedServiceData?.priceRange}</p>
            </div>

            {/* Hidden checkout form */}
            <form
              ref={formRef}
              method="POST"
              action={CHECKOUT_URL}
              className="hidden"
            >
              <input type="hidden" name="service" value={selectedService} />
              <input type="hidden" name="vehicle" value={selectedVehicle} />
              <input type="hidden" name="service_name" value={selectedServiceData?.name || ""} />
            </form>

            <button
              onClick={handleCheckout}
              className="flex items-center gap-3 bg-primary hover:bg-accent transition-all duration-300 text-white px-8 py-4 rounded-xl font-black text-lg shadow-lg shadow-primary/40 hover:shadow-accent/50 hover:scale-105 whitespace-nowrap"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <Sparkles size={20} />
              AGENDAR AGORA
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="py-6 px-4">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={bannerImg}
            alt="Estética Pinho Delivery - A estética vai até você, lavagens e detalhamentos para carros e motos, Brasília DF"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* BENEFITS */}
      <section id="beneficios" className={`py-20 px-4 transition-colors duration-300 ${lightMode ? "bg-white" : ""}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Por que a Estética Pinho?</p>
            <h2
              className={`text-4xl sm:text-5xl font-black ${lightMode ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              A ESTÉTICA VAI ATÉ VOCÊ
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className={`rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group border ${lightMode ? "bg-gray-50 border-gray-200 shadow-sm" : "bg-card border-border"}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 mb-4 group-hover:bg-primary/25 transition-colors">
                  <b.icon size={24} className="text-primary" />
                </div>
                <h4 className={`font-bold mb-2 text-base ${lightMode ? "text-gray-900" : "text-white"}`}>{b.title}</h4>
                <p className={`text-sm leading-relaxed ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`py-20 px-4 transition-colors duration-300 ${lightMode ? "bg-gray-50" : "bg-card/40"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Simples e Rápido</p>
            <h2
              className={`text-4xl sm:text-5xl font-black ${lightMode ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              COMO FUNCIONA
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {[
              {
                step: "01",
                title: "Escolha seu Serviço",
                desc: "Selecione o pacote ideal para sua moto ou carro e clique em Agendar.",
              },
              {
                step: "02",
                title: "Confirme o Horário",
                desc: "Informe o endereço e o melhor horário para o atendimento.",
              },
              {
                step: "03",
                title: "Receba em Casa",
                desc: "Nossa equipe chega até você com todo o equipamento necessário.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center space-y-3">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border-2 border-primary text-primary font-black text-xl"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {step.step}
                </div>
                <h4 className={`font-bold text-lg ${lightMode ? "text-gray-900" : "text-white"}`}>{step.title}</h4>
                <p className={`text-sm leading-relaxed ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleCheckout}
              className="inline-flex items-center gap-3 bg-primary hover:bg-accent transition-all duration-300 text-white px-10 py-4 rounded-xl font-black text-xl shadow-lg shadow-primary/40 hover:scale-105"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <Sparkles size={22} />
              AGENDAR MEU HORÁRIO
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES FLYER */}
      {/* <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6 space-y-2">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Tabela Completa</p>
            <h2
              className="text-3xl font-black text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              LAVAGENS PARA MOTOS
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
            <ImageWithFallback
              src={servicesImg}
              alt="Tabela de serviços Estética Pinho - preços e pacotes de lavagem para motos"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section> */}

      {/* CONTACT / FOOTER */}
      <section id="contato" className={`py-20 px-4 transition-colors duration-300 ${lightMode ? "bg-white" : "bg-gradient-to-b from-background to-card/60"}`}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Fale conosco</p>
            <h2
              className={`text-4xl sm:text-5xl font-black ${lightMode ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              PRONTO PARA BRILHAR?
            </h2>
            <p className={`max-w-md mx-auto ${lightMode ? "text-gray-600" : "text-muted-foreground"}`}>
              Entre em contato ou agende diretamente pelo nosso checkout. Atendimento em Brasília – DF.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5561994450329"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Phone size={18} />
              61 99445-0329
            </a>
            <a
              href="https://instagram.com/esteticapinho"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Instagram size={18} />
              @esteticapinho
            </a>
            <button
              onClick={handleCheckout}
              className="flex items-center gap-2 bg-primary hover:bg-accent transition-all text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Sparkles size={18} />
              Agendar Agora
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <MapPin size={14} className="text-primary" />
            Brasília – DF · Atendimento a domicílio
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className={`border-t py-6 px-4 transition-colors duration-300 ${lightMode ? "border-gray-200 bg-gray-50" : "border-border"}`}>
        <div className={`max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${lightMode ? "text-gray-500" : "text-muted-foreground"}`}>
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={logo}
              alt="logo"
              className="h-7 w-7 object-contain"
            />
            <span>© 2024 Estética Pinho Delivery. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Produtos premium</span>
            <span className="text-primary font-semibold">Vonix</span>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={handleCheckout}
          className="flex items-center gap-2 bg-primary hover:bg-accent shadow-xl shadow-primary/40 hover:shadow-accent/50 transition-all duration-300 text-white px-5 py-3 rounded-full font-bold text-sm hover:scale-105"
        >
          <Sparkles size={16} />
          Agendar
        </button>
      </div>
    </div>
  );
}
