<template>
    <!--file display-->
     <div class="border-t-2 w-full max-w-2xl border-black py-4 mb-5">
      <div v-if="selectedFile" class="mt-4">
        <!-- <h3 class="font-mono text-lg mb-2">{{ selectedFile.name }}</h3> -->
        <div v-if="loading" class="text-center py-4">
          Loading...
        </div>
        <div v-else class="prose max-w-none" v-html="fileContent"></div>
      </div>
      <div v-else class="text-black text-center border-2 border-black py-2">
        Select a file to view its content !
      </div>
    </div>
</template>

<script>
export default{
    props: {
        selectedFile: {
            type:Object,
            default:null
        },
        loading: {
            type: Boolean,
            default: false
        },
        fileContent:{
            type: String,
            default: ''
        }
    }
}
</script>

<style>
.prose hr {
  @apply my-6 mx-2 border-t border-black;
}
.prose img {
  max-height: 350px;
  object-fit: contain;
  margin: 1rem auto;
  text-justify: left;
}
/* buat styling markdown */
.prose h1, .prose h2, .prose h3 {
  @apply mt-4 mb-2 font-bold;
}
.prose h1 { @apply text-2xl; }
.prose h2 { @apply text-xl; }
.prose h3 { @apply text-lg; }
.prose p {
  @apply my-2 text-lg leading-7 text-justify;
}
.prose ul { @apply list-disc pl-5 pt-1; }
.prose li { @apply pb-1; }
.prose ol { @apply list-decimal pl-5; }
.prose code {
    @apply bg-[#e2cbb7] px-1 rounded text-sm font-medium;
    hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    word-break: break-all;
    overflow-wrap: break-word;
}
.prose pre { @apply bg-[#e2cbb7] border border-black p-2 rounded overflow-x-auto my-2; }
.prose a { @apply text-blue-600 hover:underline; }

::-webkit-scrollbar {
    width: 0.3rem;
    height:0.35rem;
     border-radius: 5rem;
}
 
::-webkit-scrollbar-track {
    background: #cac8c5;
         border-radius: 5rem;
}
 
::-webkit-scrollbar-thumb {
    background: #979694;
     border-radius: 5rem;
}
 
::-webkit-scrollbar-thumb:hover {
    background: #656462;
         border-radius: 5rem;
}
</style>