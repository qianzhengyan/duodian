<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
html,body,#app,.index{
  width: 100%;
  height: 100%;
}
#app,.index{
  display: flex;
  flex-direction: column;
}
a{
  text-decoration: none;
  color:#000;
}
</style>
