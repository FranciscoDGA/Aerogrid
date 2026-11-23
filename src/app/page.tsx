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
  title: "AeroGrid Brasil — Gestão de operações com drones",
  description:
    "Sistema para gerenciar clientes, drones, manutenção e operadores da sua operação com drones. Multiempresa, com isolamento de dados. Não emite autorizações de voo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AeroGrid Brasil — Gestão de operações com drones",
    description:
      "Clientes, frota, manutenção e equipe organizados em um sistema multiempresa. Sem autorizações de voo.",
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
    alt: "Tela de lista de drones do AeroGrid com campo de busca",
    caption: "Frota com busca rápida por fabricante, modelo ou número de série",
  },
  {
    file: "drone-detalhe.png",
    alt: "Tela de detalhe de um drone com histórico de manutenção",
    caption: "Detalhe do equipamento com histórico de manutenção",
  },
  {
    file: "operador-documentos.png",
    alt: "Tela de operador do AeroGrid com documentos e datas",
    caption: "Operadores com documentos e datas de validade à vista",
  },
];

function demoShotSrc(file: string): string | null {
  try {
    return fs.existsSync(path.join(DEMO_IMG_DIR, file))
      ? `/images/demo/${file}`
      : null;
  } catch {
    // Sem imagem disponível — a seção renderiza o estado vazio honesto.
    return null;
  }
}

const BENEFICIOS = [
  {
    titulo: "Visão única",
    texto:
      "Clientes, drones e operadores num painel só, com busca em cada lista.",
  },
  {
    titulo: "Histórico que fica",
    texto:
      "Cada manutenção registrada com data, descrição e custo — nada de lembrança de cabeça.",
  },
  {
    titulo: "Equipe em dia",
    texto:
      "Documentos e datas dos operadores sempre à vista, sem pastas espalhadas.",
  },
  {
    titulo: "Separação real por empresa",
    texto:
      "Cada organização enxerga apenas os próprios dados — isolamento aplicado no banco de dados, não só na tela.",
  },
];

const FUNCIONALIDADES = [
  {
    titulo: "Clientes",
    texto: "Cadastro com contato obrigatório, busca, edição e exclusão segura.",
    disponivel: true,
  },
  {
    titulo: "Drones",
    texto:
      "Fabricante, modelo, número de série, características e situação da frota.",
    disponivel: true,
  },
  {
    titulo: "Manutenção",
    texto: "Histórico por equipamento com data, descrição e custo.",
    disponivel: true,
  },
  {
    titulo: "Operadores",
    texto: "Cadastro da equipe com documentos e datas de validade.",
    disponivel: true,
  },
  {
    titulo: "Equipe e permissões",
    texto:
      "Papéis de proprietário, administrador e membro dentro de cada organização.",
    disponivel: true,
  },
  {
    titulo: "Missões e mapas",
    texto:
      "Planejamento de missões e visualização no mapa entram nas próximas etapas do produto.",
    disponivel: false,
  },
];

const PUBLICO = [
  {
    titulo: "Prestadores de serviço",
    texto:
      "Quem atende vários clientes e precisa separar cada contrato com clareza.",
  },
  {
    titulo: "Equipes pequenas",
    texto:
      "Operadores, drones e manutenção sob controle sem planilha paralela.",
  },
  {
    titulo: "Empresas que precisam se organizar",
    texto:
      "Quem quer demonstrar registro estruturado da própria operação interna.",
  },
];

const DIFERENCIAIS = [
  {
    titulo: "Feito para operações com drones",
    texto:
      "Não é um gerenciador genérico adaptado: cadastros, manutenção e documentos foram desenhados para esse tipo de operação.",
  },
  {
    titulo: "Isolamento por construção",
    texto:
      "A separação entre empresas é aplicada com políticas no próprio banco de dados, não apenas com filtros na interface.",
  },
  {
    titulo: "Postura regulatória explícita",
    texto:
      "O produto declara o que não faz: não autoriza voos, não substitui sistemas oficiais e não apresenta mapas genéricos como oficiais.",
  },
  {
    titulo: "Código com testes e documentação",
    texto:
      "Regras de validação cobertas por testes automatizados e decisões de produto documentadas.",
  },
];

const FAQ = [
  {
    pergunta: "O AeroGrid autoriza voos?",
    resposta:
      "Não. O AeroGrid é uma ferramenta de gestão e planejamento administrativo. Ele não emite autorizações de voo, não controla espaço aéreo e não substitui o SARPAS ou qualquer sistema oficial.",
  },
  {
    pergunta: "O AeroGrid é ligado ao DECEA, à ANAC ou a algum serviço UTM?",
    resposta:
      "Não. Não há integração com órgãos oficiais, e o produto não se apresenta como serviço UTM autorizado.",
  },
  {
    pergunta: "Como os dados da minha empresa são protegidos?",
    resposta:
      "Cada organização enxerga apenas os próprios dados. A separação é aplicada no banco de dados por políticas de acesso, e a autenticação é feita por conta com senha.",
  },
  {
    pergunta: "Preciso de cartão de crédito para começar?",
    resposta:
      "Não. O cadastro é gratuito e não pede cartão de crédito nesta versão.",
  },
  {
    pergunta: "Funciona no celular?",
    resposta:
      "Sim. As telas são responsivas e funcionam bem em navegadores de celular e desktop.",
  },
  {
    pergunta: "Quem pode ver os dados dentro da minha empresa?",
    resposta:
      "Você define papéis: proprietário, administrador ou membro. Todos os membros ativos da organização trabalham nos mesmos cadastros, sempre separados das demais empresas.",
  },
  {
    pergunta: "Os mapas do AeroGrid são mapas aeronáuticos oficiais?",
    resposta:
      "Não. Nenhum mapa exibido pelo AeroGrid é mapa aeronáutico oficial, e o produto não indica áreas liberadas para voo.",
  },
  {
    pergunta: "Como falo com vocês?",
    resposta:
      "Envie um e-mail para contato@aerogrid.com.br com o nome da empresa e o tamanho da equipe. Respondemos com uma demonstração do produto.",
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
    "Plataforma de gestão e planejamento administrativo de operações com drones: clientes, equipamentos, manutenção e equipe, com isolamento de dados por organização. Não emite autorizações de voo.",
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
            className="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
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
  const demoAvailable = DEMO_SHOTS.filter((shot) => demoShotSrc(shot.file));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main id="conteudo" className="flex-1">
        {/* 1. Hero */}
        <section
          aria-labelledby="hero-titulo"
          className="bg-brand-900 px-4 py-16 text-white sm:py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              Gestão de operações com drones
            </p>
            <h1
              id="hero-titulo"
              className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
            >
              O controle da sua operação com drones, em um só lugar.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-brand-100 sm:text-lg">
              Clientes, frota, manutenção e equipe organizados em um sistema
              multiempresa — com os dados de cada empresa separados e
              protegidos.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <LinkButton href="/cadastro" size="lg" variant="light">
                Criar minha conta grátis
              </LinkButton>
              <a
                href="#produto"
                className={buttonClasses("outlineLight", "lg")}
              >
                Conhecer o produto
              </a>
            </div>
            <p className="mt-6 text-sm text-brand-200">
              Sem cartão de crédito. Não emitimos autorizações de voo —{" "}
              <a href="#limitacoes" className="underline hover:text-white">
                veja o que o AeroGrid é e o que não é
              </a>
              .
            </p>
          </div>
        </section>

        {/* 2. Apresentação + honestidade */}
        <Section id="produto" titulo="O que é o AeroGrid">
          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center">
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              O AeroGrid Brasil é uma plataforma para{" "}
              <strong className="font-semibold text-gray-900">
                organizar a parte administrativa de quem opera com drones
              </strong>
              : clientes, equipamentos, histórico de manutenção, equipe e
              documentos — tudo separado por empresa, com busca e histórico.
            </p>
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-5 text-left">
              <p className="text-sm font-semibold text-brand-800">
                O que o AeroGrid não é
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                <li>
                  — Não é um sistema de autorização de voo e não substitui o
                  SARPAS.
                </li>
                <li>
                  — Não é sistema oficial do DECEA ou da ANAC, nem serviço UTM
                  autorizado.
                </li>
                <li>
                  — Não é prevenção de colisões e não garante segurança
                  operacional.
                </li>
                <li>
                  — Nenhum mapa exibido aqui é mapa aeronáutico oficial, e não
                  indicamos áreas liberadas para voo.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 3. Problemas */}
        <Section
          titulo="O que atrapalha quem opera com drone hoje"
          className="bg-gray-50"
        >
          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              "Clientes e orçamentos espalhados em planilhas que ninguém mais entende depois de seis meses.",
              "Manutenção registrada “de cabeça” — até o equipamento parar no meio de um contrato.",
              "Operadores e documentos em pastas diferentes, sem saber o que vence quando.",
              "Dados de um cliente misturados com os de outro, sem separação clara.",
            ].map((texto) => (
              <li
                key={texto}
                className="rounded-lg border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700"
              >
                {texto}
              </li>
            ))}
          </ul>
        </Section>

        {/* 4. Benefícios */}
        <Section titulo="O que você resolve com o AeroGrid">
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 p-5"
              >
                <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Funcionalidades */}
        <Section
          id="funcionalidades"
          titulo="Funcionalidades disponíveis hoje"
          className="bg-gray-50"
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUNCIONALIDADES.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.disponivel
                        ? "bg-success-bg text-success-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.disponivel ? "Disponível" : "Em breve"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-gray-700">
            Só é listado como disponível o que está funcionando nesta versão do
            produto.
          </p>
        </Section>

        {/* 6. Demonstração visual */}
        <Section id="demonstracao" titulo="Veja o sistema por dentro">
          {demoAvailable.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {DEMO_SHOTS.map((shot) => {
                const src = demoShotSrc(shot.file);
                if (!src) return null;
                return (
                  <figure key={shot.file} className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={shot.alt}
                      width={1280}
                      height={800}
                      loading="lazy"
                      className="w-full rounded-lg border border-gray-200 shadow-sm"
                    />
                    <figcaption className="text-center text-xs text-gray-500">
                      {shot.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <p className="text-sm font-medium text-gray-700">
                Capturas de tela do sistema em produção serão publicadas aqui.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Somente telas reais do produto — nenhuma imagem ilustrativa
                fingindo ser o sistema.
              </p>
            </div>
          )}
        </Section>

        {/* 7. Público */}
        <Section titulo="Para quem é o AeroGrid" className="bg-gray-50">
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PUBLICO.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 bg-white p-5"
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
        <Section titulo="Por que o AeroGrid">
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DIFERENCIAIS.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-gray-200 p-5"
              >
                <h3 className="font-semibold text-gray-900">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 9. Segurança e privacidade */}
        <Section id="seguranca" titulo="Segurança e privacidade" className="bg-gray-50">
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              <strong className="font-semibold text-gray-900">
                Seus dados pertencem à sua empresa.
              </strong>{" "}
              O AeroGrid separa as organizações no nível do banco de dados: uma
              empresa não enxerga os dados da outra, mesmo usando o mesmo
              sistema.
            </p>
            <p>
              O acesso é feito por conta individual com senha, com papéis de
              proprietário, administrador e membro dentro de cada organização.
              Não vendemos nem compartilhamos seus dados com terceiros.
            </p>
            <p className="text-xs text-gray-500">
              Os testes de isolamento entre empresas estão em homologação —
              registramos essa pendência publicamente em vez de assumi-la como
              concluída.
            </p>
          </div>
        </Section>

        {/* 10. Limitações e regulatório */}
        <Section id="limitacoes" titulo="Limitações e esclarecimentos">
          <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-warning/40 bg-warning-bg p-6">
            <p className="text-sm font-semibold text-warning-700">
              Leia antes de contratar
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
              <li>
                O AeroGrid é uma plataforma de{" "}
                <strong>gestão e planejamento administrativo e geográfico</strong>{" "}
                de operações com drones.
              </li>
              <li>
                <strong>Não emite autorizações de voo</strong>, não substitui o
                SARPAS, não é sistema oficial do DECEA ou da ANAC e não é
                serviço UTM autorizado.
              </li>
              <li>
                <strong>Não é sistema de prevenção de colisões</strong> e não
                garante segurança operacional.
              </li>
              <li>
                Nenhum mapa exibido é mapa aeronáutico oficial; o produto não
                indica áreas liberadas para voo.
              </li>
              <li>
                Não anunciamos integrações com órgãos oficiais porque não
                temos nenhuma comprovada.
              </li>
            </ul>
          </div>
        </Section>

        {/* 11. FAQ */}
        <Section id="faq" titulo="Perguntas frequentes" className="bg-gray-50">
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {FAQ.map((item) => (
              <details key={item.pergunta} className="group p-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block text-brand-600 transition-transform duration-150 group-open:rotate-90"
                  >
                    ›
                  </span>
                  {item.pergunta}
                </summary>
                <p className="mt-3 pl-5 text-sm leading-relaxed text-gray-600">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </Section>

        {/* 12. CTA final */}
        <section
          aria-labelledby="cta-final-titulo"
          className="bg-brand-900 px-4 py-16 text-white"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-final-titulo"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Comece a organizar sua operação hoje
            </h2>
            <p className="mt-4 text-sm text-brand-100 sm:text-base">
              Crie sua conta e cadastre seu primeiro cliente em minutos. Sem
              cartão de crédito.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <LinkButton href="/cadastro" size="lg" variant="light">
                Criar minha conta grátis
              </LinkButton>
              <a href={mailtoContato()} className={buttonClasses("outlineLight", "lg")}>
                Solicitar demonstração
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-brand-700"
      >
        Pular para o conteúdo
      </a>

      <script
        type="application/ld+json"
      >{JSON.stringify(JSON_LD)}</script>
    </div>
  );
}
