import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { buttonClasses } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "AeroGrid Brasil — Gestão administrativa de operações com drones",
  description:
    "Sistema para gerenciar clientes, frota de drones, histórico de manutenção e equipe técnica da sua operação. Multiempresa com isolamento por organização. Não emite autorizações de voo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AeroGrid Brasil — Gestão administrativa de operações com drones",
    description:
      "Clientes, frota, manutenção e equipe técnica organizados em um sistema com isolamento de dados. Não emite autorizações de voo.",
    locale: "pt_BR",
    type: "website",
    siteName: "AeroGrid Brasil",
  },
};

const CONTATO_EMAIL = "contato@aerogrid.com.br";

const DEMO_MAILS = {
  subject: "Quero conhecer o AeroGrid Brasil",
  body: "Olá,\n\nGostaria de conhecer o AeroGrid Brasil.\n\nEmpresa:\nCidade/UF:\nTamanho da equipe de operações:\n\nObrigado.",
};

const DEMO_IMG_DIR = path.join(process.cwd(), "public", "images", "demo");

type DemoCaptions = { file: string; alt: string; caption: string };

const DEMO_SHOTS: DemoCaptions[] = [
  {
    file: "drones-lista.png",
    alt: "Interface de lista de drones do AeroGrid com situação interna e número de série",
    caption: "Gestão da frota com modelos, números de série e situação cadastrada",
  },
  {
    file: "drone-detalhe.png",
    alt: "Interface de detalhe do drone com histórico de manutenção e custos",
    caption: "Histórico de manutenções com data, descrição do serviço e custos",
  },
  {
    file: "operador-documentos.png",
    alt: "Interface de operador com qualificações declaradas e documentos cadastrados",
    caption: "Equipe técnica com qualificações declaradas e validades de documentos",
  },
];

function demoShotSrc(file: string): string | null {
  try {
    return fs.existsSync(path.join(DEMO_IMG_DIR, file))
      ? `/images/demo/${file}`
      : null;
  } catch {
    return null;
  }
}

const BENEFICIOS = [
  {
    titulo: "Visão centralizada",
    texto:
      "Clientes, frota de drones e operadores em um painel unificado, com busca e filtros.",
  },
  {
    titulo: "Histórico de manutenção",
    texto:
      "Cada manutenção registrada com data, descrição e custo — evitando revisões esquecidas.",
  },
  {
    titulo: "Documentação da equipe",
    texto:
      "Documentos e datas de validade dos operadores organizados em um só lugar.",
  },
  {
    titulo: "Isolamento por empresa",
    texto:
      "Cada organização visualiza exclusivamente os próprios dados, com separação no banco de dados.",
  },
];

const FUNCIONALIDADES = [
  {
    titulo: "Clientes",
    texto: "Cadastro completo com canais de contato, notas, busca, edição e exclusão lógica.",
    disponivel: true,
  },
  {
    titulo: "Frota de Drones",
    texto:
      "Fabricante, modelo, número de série, especificações técnicas e controle de situação interna.",
    disponivel: true,
  },
  {
    titulo: "Histórico de Manutenção",
    texto: "Registro de revisões preventivas e corretivas com custo e data por equipamento.",
    disponivel: true,
  },
  {
    titulo: "Operadores e Pilotos",
    texto: "Cadastro da equipe técnica com documentos arquivados e prazos de validade.",
    disponivel: true,
  },
  {
    titulo: "Equipe e Permissões",
    texto:
      "Controle de acesso por organização com papéis de proprietário, administrador e membro.",
    disponivel: true,
  },
  {
    titulo: "Missões e Mapas Geográficos",
    texto:
      "Planejamento de missões, waypoints e visualização em mapas estão no roadmap da Fase 2.",
    disponivel: false,
  },
];

const PUBLICO = [
  {
    titulo: "Prestadores de serviços com drones",
    texto:
      "Quem realiza mapeamento, inspeção ou pulverização e precisa organizar múltiplos clientes e contratos.",
  },
  {
    titulo: "Operadores e equipes técnicas",
    texto:
      "Equipes que precisam controlar manutenções, peças e documentos de pilotos sem planilhas soltas.",
  },
  {
    titulo: "Empresas com operação interna",
    texto:
      "Organizações que utilizam drones e necessitam de registro administrativo para auditorias internas.",
  },
];

const DIFERENCIAIS = [
  {
    titulo: "Focado em operações com drones",
    texto:
      "Desenvolvido especificamente para os fluxos administrativos de quem trabalha com aeronaves remotamente pilotadas.",
  },
  {
    titulo: "Segurança por design (Multi-tenant)",
    texto:
      "Isolamento entre empresas configurado no nível do banco de dados (Row Level Security), não apenas filtros de interface.",
  },
  {
    titulo: "Transparência regulatória rigorosa",
    texto:
      "Declaramos explicitamente o que o software faz e o que não faz: não substitui o SARPAS e não emite autorizações de voo.",
  },
  {
    titulo: "Arquitetura com testes automatizados",
    texto:
      "Regras de validação e consistência cobertas por testes automatizados de regressão contínua.",
  },
];

const FAQ = [
  {
    pergunta: "O AeroGrid autoriza voos?",
    resposta:
      "Não. O AeroGrid é exclusivamente uma plataforma de gestão administrativa e operacional. Ele não emite autorizações de voo, não controla espaço aéreo e não substitui o SARPAS ou qualquer outro sistema oficial do DECEA.",
  },
  {
    pergunta: "O AeroGrid é integrado à ANAC ou ao DECEA?",
    resposta:
      "Não. O AeroGrid não possui integração oficial com a ANAC, com o DECEA ou com serviços UTM. O produto não se apresenta como entidade governamental ou credenciada.",
  },
  {
    pergunta: "Como os dados da minha empresa são protegidos?",
    resposta:
      "Cada organização tem seus dados separados no nível do banco de dados (Row Level Security). Membros de uma empresa não têm acesso aos clientes, drones ou documentos de outra organização.",
  },
  {
    pergunta: "É necessário cadastrar cartão de crédito para testar?",
    resposta:
      "Não. O cadastro e o uso do sistema nesta versão são gratuitos, sem necessidade de informar cartão de crédito.",
  },
  {
    pergunta: "O sistema funciona em celular e tablet?",
    resposta:
      "Sim. Todas as interfaces foram construídas com layout responsivo para uso prático em computadores de escritório ou dispositivos móveis em campo.",
  },
  {
    pergunta: "O AeroGrid valida carteiras ou habilitações de pilotos?",
    resposta:
      "Não. O cadastro de qualificações e documentos é meramente declaratório para organização interna da empresa. O sistema não atesta competência técnica de operadores.",
  },
  {
    pergunta: "Os mapas do AeroGrid são cartas aeronáuticas?",
    resposta:
      "Não. Nenhum mapa que venha a ser exibido no sistema possui valor de carta aeronáutica oficial. Planejamento de espaço aéreo deve ser feito exclusivamente nos canais oficiais do DECEA.",
  },
  {
    pergunta: "Como entrar em contato para dúvidas ou demonstrações?",
    resposta:
      "Basta enviar um e-mail para contato@aerogrid.com.br informando o nome da empresa e o tamanho da sua operação.",
  },
] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AeroGrid Brasil",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  description:
    "Plataforma de gestão administrativa de operações com drones: clientes, frota, manutenção e equipe técnica com isolamento multiempresa. Não emite autorizações de voo.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description:
      "Cadastro gratuito nesta versão, sem cartão de crédito. Condições comerciais futuras a anunciar.",
  },
};

function mailtoContato(): string {
  return `mailto:${CONTATO_EMAIL}?subject=${encodeURIComponent(DEMO_MAILS.subject)}&body=${encodeURIComponent(DEMO_MAILS.body)}`;
}

function Section({
  id,
  titulo,
  children,
  className = "",
}: {
  id?: string;
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-titulo` : undefined}
      className={`scroll-mt-20 px-4 py-14 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {titulo && (
          <h2
            id={id ? `${id}-titulo` : undefined}
            className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {titulo}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

export default function LandingPage() {
  const heroShot = demoShotSrc("drones-lista.png");
  const demoAvailable = DEMO_SHOTS.filter((shot) => demoShotSrc(shot.file));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main id="conteudo" className="flex-1">
        {/* 1. Hero / Primeira Dobra de Alto Impacto */}
        <section
          aria-labelledby="hero-titulo"
          className="bg-brand-900 px-4 pt-16 pb-20 text-white sm:pt-24 sm:pb-28"
        >
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-800/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200 border border-brand-700/60">
              Gestão administrativa de operações com drones
            </span>
            <h1
              id="hero-titulo"
              className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance"
            >
              O controle da sua operação com drones, em um só lugar.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-brand-100 sm:text-lg leading-relaxed">
              Clientes, frota de equipamentos, histórico de manutenção e equipe
              técnica organizados em uma plataforma multiempresa segura.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <LinkButton href="/cadastro" size="lg" variant="light">
                Criar minha conta grátis
              </LinkButton>
              <a
                href="#demonstracao"
                className={buttonClasses("outlineLight", "lg")}
              >
                Ver telas do sistema
              </a>
            </div>

            <p className="mt-5 text-xs text-brand-200/90">
              Sem cartão de crédito • Não emite autorizações de voo • Não substitui o SARPAS
            </p>

            {/* Prévia real da interface na primeira dobra */}
            {heroShot && (
              <div className="mt-12 overflow-hidden rounded-xl border border-brand-700/50 bg-brand-950/40 p-2 shadow-2xl backdrop-blur-xs sm:p-3">
                <div className="overflow-hidden rounded-lg border border-gray-800 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroShot}
                    alt="Visão da lista de drones e controle de frota no AeroGrid"
                    width={1280}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-center text-xs text-brand-300">
                  Interface real: controle de inventário da frota e registros operacionais
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 2. Apresentação e Limitações Regulatórias Claras */}
        <Section id="produto" titulo="O que é o AeroGrid">
          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center">
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              O AeroGrid Brasil é uma ferramenta para{" "}
              <strong className="font-semibold text-gray-900">
                organizar os bastidores administrativos da sua empresa de drones
              </strong>
              : contratos de clientes, dados técnicos da frota, controle de manutenções e documentação da equipe.
            </p>

            {/* Aviso regulatório obrigatório */}
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 text-left">
              <p className="text-sm font-bold text-brand-900 uppercase tracking-wide">
                Declaração de Escopo e Limitações
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-700">•</span>
                  <span><strong>Não autoriza voos:</strong> o sistema não substitui o SARPAS ou qualquer órgão oficial.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-700">•</span>
                  <span><strong>Não é sistema governamental:</strong> sem ligação ou credenciamento com DECEA, ANAC ou serviços UTM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-700">•</span>
                  <span><strong>Não previne colisões:</strong> o sistema é administrativo e não atua no espaço aéreo em tempo real.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-700">•</span>
                  <span><strong>Mapas não são cartas oficiais:</strong> nenhum mapa na plataforma indica áreas liberadas para voo.</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 3. Problemas Operacionais Resolvidos */}
        <Section
          titulo="Problemas que resolvemos na sua rotina"
          className="bg-gray-50"
        >
          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              "Planilhas paralelas desatualizadas onde números de série e contratos se perdem.",
              "Manutenção feita “de cabeça”, sem controle de custos ou histórico por equipamento.",
              "Documentos e validades de pilotos dispersos em pastas e mensagens de chat.",
              "Falta de separação segura entre os contratos e equipamentos de cada empresa.",
            ].map((texto) => (
              <li
                key={texto}
                className="rounded-lg border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700 shadow-xs"
              >
                {texto}
              </li>
            ))}
          </ul>
        </Section>

        {/* 4. Benefícios Principais */}
        <Section titulo="Vantagens para a sua empresa">
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 p-5 bg-white shadow-xs"
              >
                <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Funcionalidades do Produto */}
        <Section
          id="funcionalidades"
          titulo="Recursos do Sistema"
          className="bg-gray-50"
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUNCIONALIDADES.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.disponivel
                        ? "bg-success-bg text-success-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.disponivel ? "Disponível" : "Em desenvolvimento"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-gray-500">
            Apresentamos com transparência apenas os recursos efetivamente disponíveis nesta versão do produto.
          </p>
        </Section>

        {/* 6. Demonstração Visual com Telas Reais */}
        <Section id="demonstracao" titulo="Veja o sistema por dentro">
          {demoAvailable.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {DEMO_SHOTS.map((shot) => {
                const src = demoShotSrc(shot.file);
                if (!src) return null;
                return (
                  <figure key={shot.file} className="space-y-2">
                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={shot.alt}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="text-center text-xs font-medium text-gray-600">
                      {shot.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <p className="text-sm font-medium text-gray-700">
                Capturas de tela reais do sistema em produção.
              </p>
            </div>
          )}
        </Section>

        {/* 7. Público Alvo */}
        <Section titulo="Para quem foi feito o AeroGrid" className="bg-gray-50">
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PUBLICO.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs"
              >
                <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Diferenciais */}
        <Section titulo="Por que escolher o AeroGrid">
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DIFERENCIAIS.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs"
              >
                <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Segurança e Privacidade com Honestidade Técnica */}
        <Section id="seguranca" titulo="Segurança e Isolamento de Dados">
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              <strong className="font-semibold text-gray-900">
                Os dados da sua organização pertencem exclusivamente a ela.
              </strong>{" "}
              O isolamento é aplicado no nível do banco de dados através de políticas de Row Level Security (RLS). Uma organização não acessa registros de outra.
            </p>
            <p>
              O controle de acessos conta com papéis de proprietário, administrador e membro. Não compartilhamos nem comercializamos informações cadastradas.
            </p>
            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-200">
              Estado dos testes: as regras de banco de dados e validações com schemas Zod estão testadas e ativas. Os testes integrados de isolamento em ambiente de homologação seguem o cronograma de validação contínua registrado na documentação técnica.
            </p>
          </div>
        </Section>

        {/* 9. FAQ / Perguntas Frequentes */}
        <Section id="faq" titulo="Perguntas Frequentes" className="bg-gray-50">
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-xs">
            {FAQ.map((item) => (
              <details key={item.pergunta} className="group p-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 flex items-center justify-between">
                  <span>{item.pergunta}</span>
                  <span
                    aria-hidden="true"
                    className="ml-2 font-bold text-brand-600 transition-transform duration-150 group-open:rotate-90"
                  >
                    ›
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 border-t border-gray-100 pt-3">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </Section>

        {/* 10. Chamada Final */}
        <section
          aria-labelledby="cta-final-titulo"
          className="bg-brand-900 px-4 py-16 text-white text-center"
        >
          <div className="mx-auto max-w-2xl">
            <h2
              id="cta-final-titulo"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Organize a operação de drones da sua empresa
            </h2>
            <p className="mt-4 text-sm text-brand-100 sm:text-base">
              Cadastre sua organização e estruture clientes, frota e manutenção em minutos.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <LinkButton href="/cadastro" size="lg" variant="light">
                Criar minha conta grátis
              </LinkButton>
              <a href={mailtoContato()} className={buttonClasses("outlineLight", "lg")}>
                Falar com a equipe
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
      >{JSON.stringify(JSON_LD)}</script>
    </div>
  );
}
