
<template>
    <div class="not-found">
    <h1>404</h1>
    <h2> NOT FOUND</h2>
    <img src="../../public/img/notFound.png" alt="">
    <button><router-link to="/" exact>Volver al Inicio</router-link></button>
    </div>
</template>

<script>
    export default{
        name: "NotFoundView"
    }
</script>

<style>
    :root {
        --celeste-primario: #B3E5FC; 
        --blanco: #FFFFFF;
        --celeste-contraste: #03A9F4;  
        --celeste-oscuro: #255569;
    }

    .not-found {
         display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        height: 100vh;
        background-color: #b9edff;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 65px;
        border-radius: 20px;
    }
    .not-found h1 {
        font-size: 6em;
        color: var(--celeste-oscuro, #255569);
        margin-bottom: 5px;
        margin-top: 20px;
    }
    .not-found h2 {
        font-size: 2em;
        color: var(--celeste-contraste, #03A9F4);
        margin-bottom: 10px;
        margin-top: 0;
    }
    .not-found img {
        max-width: 300px;
        margin-bottom: 30px;
    }
    .not-found button {
         display: inline-block;
        padding: 10px 40px;
        background-color: var(--celeste-contraste, #03A9F4);
        color: var(--blanco, #FFFFFF);
        border-radius: 10px;
        font-size: 1.2em;
        transition: transform 0.2s ease;
        margin-bottom: 30px;
        border: none;
    }
    .not-found button:hover {
        transform: scale(1.05);
    }
    .not-found a {
        color: var(--blanco, #FFFFFF);
        text-decoration: none;
        font-weight: bold;
    }


</style>