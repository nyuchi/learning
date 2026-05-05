<script>
  /**
   * One-pager for learning.nyuchi.com.
   *
   * The standalone Astro site that used to live here was split into
   * three surfaces in the bundu-labs/marketing monorepo (PR #5):
   *   - bundu.org/education  → open frameworks (Bundu Education)
   *   - nyuchi.com/learning  → commercial training (Nyuchi Learning)
   *   - mukoko.com/lingo     → consumer language learning (Mukoko Lingo)
   *
   * This page exists so the old domain still resolves — visitors land
   * here and pick the surface that matches what they came for.
   */

  const projects = [
    {
      name: "Bundu Education",
      eyebrow: "Foundation initiative",
      description:
        "Open, evidence-based frameworks for K-12 digital campuses, digital literacy, and support process. Free to copy, adapt, and share. The Foundation publishes; anyone can implement.",
      cta: "Explore the frameworks",
      href: "https://bundu.org/education",
      mineral: "malachite",
    },
    {
      name: "Nyuchi Learning",
      eyebrow: "Commercial product",
      description:
        "Cohort-based and self-paced training in software, AI, and digital skills. Localised for Africa with offline study packs. Implementation services for organisations adopting the Bundu Education frameworks.",
      cta: "See the programme",
      href: "https://nyuchi.com/learning",
      mineral: "gold",
    },
    {
      name: "Mukoko Lingo",
      eyebrow: "Consumer surface",
      description:
        "African language learning, free for personal use. Shona and Ndebele primary, plus English, French, Portuguese, and travel phrase courses. The same content library Bundu Education and Nyuchi Learning draw from.",
      cta: "Start learning",
      href: "https://mukoko.com/lingo",
      mineral: "tanzanite",
    },
  ];
</script>

<svelte:head>
  <title>nyuchi learning — find your way to learning resources</title>
  <meta
    name="description"
    content="The learning content from learning.nyuchi.com lives in three places now: bundu.org/education for the open frameworks, nyuchi.com/learning for commercial training, and mukoko.com/lingo for consumer language learning."
  />
  <link rel="canonical" href="https://learning.nyuchi.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://learning.nyuchi.com/" />
  <meta
    property="og:title"
    content="nyuchi learning — find your way to learning resources"
  />
  <meta
    property="og:description"
    content="The learning content lives in three places now: open frameworks at bundu.org/education, commercial training at nyuchi.com/learning, consumer language learning at mukoko.com/lingo."
  />
  <meta property="og:site_name" content="Nyuchi Africa" />
</svelte:head>

<header class="container-custom pt-10 md:pt-14">
  <a
    href="https://nyuchi.com"
    class="inline-flex items-center gap-2 font-serif text-h5 font-bold text-foreground"
    aria-label="Nyuchi Africa — home"
  >
    <span
      aria-hidden="true"
      class="inline-block w-2.5 h-2.5 rounded-full bg-malachite"
    ></span>
    nyuchi learning
  </a>
</header>

<main>
  <section class="container-custom pt-12 md:pt-20 pb-12 md:pb-16">
    <div class="max-w-3xl">
      <p class="eyebrow">A redirect, not a destination</p>
      <h1 class="font-serif text-display-sm text-foreground text-balance">
        Learning lives in three places now.
      </h1>
      <p class="mt-6 text-body-lg text-muted-foreground text-pretty max-w-2xl">
        The learning content that used to live at learning.nyuchi.com has been
        split across the Bundu Family ecosystem. Pick the one that matches what
        you came for.
      </p>
    </div>
  </section>

  <section class="container-custom pb-16 md:pb-24">
    <div class="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each projects as project}
        <article
          class="card p-6 md:p-8 flex flex-col h-full transition-shadow duration-200 ease-soft hover:shadow-sm"
        >
          <div class="flex items-center gap-2 mb-4">
            <span
              aria-hidden="true"
              class="inline-block w-2 h-2 rounded-full bg-{project.mineral}"
            ></span>
            <p
              class="text-caption font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {project.eyebrow}
            </p>
          </div>
          <h2 class="font-serif text-h3 text-foreground text-balance">
            {project.name}
          </h2>
          <p class="mt-4 text-body text-muted-foreground text-pretty flex-1">
            {project.description}
          </p>
          <a
            href={project.href}
            class="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-foreground hover:opacity-80 transition-opacity self-start"
          >
            {project.cta}
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </article>
      {/each}
    </div>
  </section>

  <section class="bg-secondary border-t border-border">
    <div class="container-custom section-tight">
      <div class="max-w-2xl">
        <p class="eyebrow">How they fit together</p>
        <h2 class="font-serif text-h2 text-foreground text-balance">
          One library, three surfaces.
        </h2>
        <p class="mt-6 text-body text-muted-foreground text-pretty">
          The Foundation publishes the open frameworks at Bundu Education.
          Nyuchi Learning is the commercial vehicle organisations use when they
          want help implementing them. Mukoko Lingo is the consumer app for
          individuals who want to learn a language. Same content library
          underneath; different surfaces for different audiences.
        </p>
      </div>
    </div>
  </section>
</main>

<footer class="container-custom py-12 md:py-16 border-t border-border">
  <div
    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <p class="text-body-sm text-muted-foreground">
      A part of the
      <a
        href="https://bundu.org"
        class="text-foreground hover:opacity-80 transition-opacity"
        >Bundu Family</a
      >
      ecosystem. Nyuchi Africa operates; Bundu Foundation governs.
    </p>
    <ul class="flex flex-wrap gap-6">
      <li>
        <a
          href="https://nyuchi.com"
          class="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >Nyuchi Africa</a
        >
      </li>
      <li>
        <a
          href="https://bundu.org"
          class="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >Bundu Foundation</a
        >
      </li>
      <li>
        <a
          href="https://mukoko.com"
          class="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >Mukoko</a
        >
      </li>
    </ul>
  </div>
</footer>
