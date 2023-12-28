//src/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Component
}

//if you use env variables c:
declare module '*/envs.ts'
