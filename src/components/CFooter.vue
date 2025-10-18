<template>
    <footer>
        <p>© 2025 Proyecto Memory Card</p>
    </footer>
</template>
<script>
    export default{
        name: "CFooter"
    }
</script>

<style scoped>
    
    :root {
        --celeste-primario: #B3E5FC; 
        --celeste-oscuro: #0288D1; 
    }

    footer {
        position: fixed; 
        bottom: 0;
        left: 0;
        width: 100%;
    
        background-color: var(--celeste-primario, #B3E5FC); 
        color: var(--celeste-oscuro, #0288D1); 
        text-align: center; 
        padding: 0.75rem 0; 
        font-size: 0.9rem; 
        font-weight: 500;
        box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1); 
        z-index: 10; 
    }

    
    footer p {
        margin: 0; 
    }
</style>
