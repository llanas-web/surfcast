<script setup lang="ts"></script>

<template>
  <section
    id="hero"
    class="overflow-hidden lg:relative pt-12 sm:pt-20 md:pt-24 lg:pt-32"
    sectionname="hero"
    sectionlabel="Hero"
    sortorder="0"
  >
    <div
      class="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24 relative z-10"
    >
      <div class="relative z-[1]">
        <!---->
        <div class="">
          <div class="mt-6 sm:max-w-xl">
            <h1
              class="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl xl:text-7xl preview-menu-wrapper relative"
            >
              Prévisions détaillées des conditions de surf
            </h1>
            <h2
              class="prose prose-user mt-6 text-lg text-gray-500 sm:text-xl preview-menu-wrapper relative"
            >
              Obtenez des prévisions détaillées des conditions de surf, y compris la hauteur des
              vagues, la hauteur de la houle, la période des vagues, la force du vent et la
              direction du vent pour chaque heure de la journée.
            </h2>
          </div>
          <div class="mt-10 space-y-4">
            <div class="preview-menu-wrapper relative">
              <form
                class="sm:w-full space-y-2 mt-4 sm:max-w-lg"
                data-site-id="upuDSy59PzFKraS7BS8s"
                client:only=""
              >
                <div class="space-y-2">
                  <div
                    class="grid gap-2 grid-cols-1 sm:w-full sm:flex sm:items-center sm:flex-wrap"
                  >
                    <label for="hero-email" class="sr-only">Email address</label
                    ><input
                      id="hero-email"
                      type="email"
                      class="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary focus-visible:ring-primary flex-1 sm:col-span-2"
                      placeholder="Enter your email..."
                    />
                    <div class="flex">
                      <button
                        to=""
                        class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-blue-300 text-base rounded-lg font-bold py-3 px-4"
                        type="submit"
                      >
                        Start Checking
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:pl-6">
      <div
        class="pt-12 sm:relative sm:mt-12 sm:pt-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 z-20"
      >
        <div class="hidden sm:block">
          <div
            class="absolute inset-y-0 w-screen left-1/2 bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"
          ></div>
          <svg
            class="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0"
            width="404"
            height="392"
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
          </svg>
        </div>
        <div
          class="relative pl-4 ml-auto sm:max-w-4xl sm:px-0 lg:h-full lg:max-w-none lg:flex lg:items-center xl:pl-12 preview-menu-wrapper"
        >
          <img
            class="w-full rounded-l-3xl lg:w-auto 2xl:h-full 2xl:max-w-none 2xl:rounded-3xl"
            src="https://images.unsplash.com/photo-1503177847378-d2048487fa46?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDY1Mzg5OTF8&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
            alt="Surfcast"
          />
        </div>
      </div>
    </div>
  </section>
</template>
