<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '../assets/pfizer-6.svg';
import { ref } from 'vue';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

// State for controlling if the menu is open or closed
const isMenuOpen = ref(false);

const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    }

const closeMenu = () => {
      isMenuOpen.value = false;
    }

</script>

<template>
    <nav class="nav">
         <!-- Hamburger Menu Button -->
        
        <div class="container">
            <div class="nav-inner">
                <div class="nav-flex">
                    <!-- Add your content here -->
                    <!-- Logo -->
                    <RouterLink class="logo-link" to="/">
                        <img class="logo-img" :src="logo" alt="Vue Jobs" />
                        <span class="logo-text">Pharmaceutical App</span>
                    </RouterLink>

                    <div class="nav-container">
                        <button class="menu-btn" @click="toggleMenu">
                            ☰
                        </button>
                        <div :class="['nav-links', { 'show-menu': isMenuOpen }]">
                            <RouterLink
                                to="/"
                                :class="[ 'nav-item', isActiveLink('/') ? 'active-link' : 'inactive-link']"
                                @click="closeMenu"
                            >Home</RouterLink>

                            <RouterLink
                                to="/products/add"
                                :class="['nav-item', isActiveLink('/products/add') ? 'active-link' : 'inactive-link']"
                                @click="closeMenu"
                            >Add Product</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>



</template>

<style scoped>
    /* Navigation bar styling */
    .nav {
        background-color: #094ee2; 
        border-bottom: 1px solid #272b67;
    }

    /* Container */
    .container {
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 8px;
        padding-right: 8px;
    }

    @media (min-width: 640px) {
        .container {
            padding-left: 24px;
            padding-right: 24px;
        }
    }

    @media (min-width: 1024px) {
        .container {
            padding-left: 32px;
            padding-right: 32px;
        }
    }

    /* Hamburger menu button */
    .menu-btn {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        display: none; /* Hidden by default */
    }


    /* Flex layout */
    .nav-inner {
        display: flex;
        height: 80px;
        align-items: center;
        justify-content: space-between;
    }

    .nav-flex {
        display: flex;
        flex-grow: 1;
        justify-content: center;
    }



    /* Logo Link */
    .logo-link {
        display: flex;
        align-items: center;
        margin-right: 1rem; /* 16px */
        flex-shrink: 0;
        text-decoration: none;
    }

    /* Logo Image */
    .logo-img {
        height: 2.5rem; /* 40px */
        width: auto;
    }

    /* Logo Text */
    .logo-text {
        display: none;
        color: white;
        font-size: 1.5rem; /* 24px */
        font-weight: bold;
        margin-left: 0.5rem; /* 8px */
        
    }

    @media (min-width: 768px) {
        /* Show text on medium and larger screens */
        .logo-text {
            display: block;
        }

        .nav-flex {
            justify-content: flex-start;
            align-items: stretch;
        }

        
    }

    /* Container styling */
    .nav-container {
    margin-left: auto;
    }

    /* Flexbox for links */
    .nav-links {
        display: flex;
        gap: 0.5rem; /* space-x-2 equivalent */
    }

    .nav-item {
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        text-decoration: none;
    }

    /* Default link styling */
    .inactive-link {

        transition: background-color 0.3s, color 0.3s; /* For hover effects */
    }

    /* Hover styling */
    .inactive-link:hover {
        background-color: #041f53; /* gray-900 */
    }

    /* Active link styling */
    .active-link {
        background-color: #4f63d6; /* green-900 */

    }

    @media (max-width: 481px) {
      
        /* Hide the navigation list on mobile by default */
        .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: #094ee2; 
            gap: 0;
            
        }

        

        /* Show the navigation list when the menu is open */
        .show-menu {
            display: flex;
        }

        /* Show the hamburger button on mobile */
        .menu-btn {
            display: block;
        }

        /* Styling for mobile links in column format */
        .nav-item {
            text-align: center;
            padding: 1.5rem;
            border-radius: 0;
            border-bottom: 1px solid #4f63d6;; /* Adds a border between the items */
        }

        .nav-item:last-child {
            border-bottom: none;
        }
        
    }
</style>