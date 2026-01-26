<template>
  <div class="max-w-3xl mx-auto p-7 mt-2 md:text-[1.14rem] md:max-w-[53rem] md:mb-4 font-inter font">
    <About />
    <Education />
    <Experience />
    <TechnicalProjects/>
    <BackendProjects /> 
    <ExplorationProjects />
  </div>
</template>

<script>
import About from '../components/home/About.vue';
import Education from '../components/home/Education.vue';
import Experience from '../components/home/Experience.vue';
import BackendProjects from '../components/home/BackendProjects.vue';
import ExplorationProjects from '../components/home/ExplorationProjects.vue';
import TechnicalProjects from '../components/home/TechnicalProjects.vue';

export default {
  name: 'Home',
  components: {
    About,
    Education,
    Experience,
    TechnicalProjects,
    BackendProjects,
    ExplorationProjects
  }
}
</script>
