<template>
    <div class="absolute top-20 w-full">
      <div class="flex content-center justify-center font-bold text-red-500 text-[0.6rem]"></div>
    </div>

    <nav class="px-5 2xl:text-[1.08rem]">
      <div class="mt-3 border-b-[0.1rem] max-w-md 2xl:max-w-[29rem] mx-auto border-black text-black p-4">
        <ul class="flex space-x-4 justify-center font-serif">
          <li>
            <router-link to="/" class="hover:underline">Home</router-link>
          </li>
          <li>
            <router-link to="/project" class="hover:underline">Project</router-link>
          </li>
          <li>
            <router-link to="/blogs" class="hover:underline">Blogs</router-link>
          </li>
          <li>
            <router-link to="/contact" class="hover:underline">Contact</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div>
      <slot></slot>
    </div>

    <footer class="px-1 mx-2 mt-3 flex flex-col items-center justify-center">
      <div class="border-black border-t-[0.1rem] mx-auto max-w-lg w-full"></div>
      <div class="mt-3 text-sm 2xl:text-[0.9rem] text-center max-w-lg mx-auto text-black ">
        <span class="cursor-pointer hover:underline underline-offset-4">© Habbatul Qolbi H.</span> 2024 – {{
        getCurrentYear() }} | <a href="https://github.com/Habbatul"
          class="hover:underline underline-offset-4">Github</a>
        | <a href="https://www.linkedin.com/in/habbatul/"
          class="hover:underline underline-offset-4  py-4 my-4">Linkedin</a>
      </div>
    </footer>

</template>

<script>
export default {
  name: 'Main',
  methods: {
    getCurrentYear() {
      const currentYear = new Date().getFullYear();
      return currentYear;
    }
  }
}
</script>