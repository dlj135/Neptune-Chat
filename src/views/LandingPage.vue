<template>
  <div class="full-screen-background">
    <!-- Logo -->
    <div class="top-image-container">
      <img src="/img/neptunePNG.png" alt="Descriptive Alt Text" class="img-fluid" />
    </div>

     <!-- Log In Button -->
     <div class="login-button-container">
    </div>

    <!-- Text below image -->
    <div class="bg-transparent mt-1">
  <p style="font-size: 16px;">Connect Across Galaxies with Neptune's Secure Chat</p>
</div>

    <!-- Carousel (very cool) -->
    <div class="container mt-4">
      <Carousel autoplay=5000>
        <Slide v-for="image in images" :key="image.src">
          <div class="carousel__item">
            <img :src="image.src" alt="Image description" class="carousel__item-image" />
            <div class="carousel__item-text">
              <h2>{{ image.title }}</h2>
              <p>{{ image.description }}</p>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <!-- Navgation Cards-->
    <div class="container-lg">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-6" style="margin-bottom: 10px;">
          <div class="card" @click="handleCardClick(card)" v-for="card in cards" :key="card.id" style="background-color: #007bff; width: 300px; height: 100px; margin: 20px; margin-bottom: 25px;">
            <div class="card-body">
              <h5 class="card-title font-weight-bold" style="user-select: none;">{{ card.title }}</h5>
              <p class="card-text" style="user-select: none;">{{ card.description }}</p>
            </div>
          </div>
        </div>
        <h3 class="neptune-title">What Is Neptune?</h3>
        <div class="col-md-6" style="border: 2px solid #007bff; border-radius: 10px;">

          <div class="paragraph-box" style="background-color: black; color: white; padding: 20px;">
            <p>Neptune is a real-time messaging service that allows users to communicate securely on the internet. Our goal is to give our users a space in which they can feel safe and secure with their data in transit. Neptune was created by four cybersecurity students from Florida Southern College.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

export default {
  name: 'LandingPage',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods: {

    handleLoginClick() {
      // Redirect to login page or open login modal
      console.log("Log In button clicked"); // Placeholder action
    },
    handleCardClick(card) {
      if (card.id === 1) {
        // Assuming you have routes named '/login' and '/register'
        this.$router.push('/login');
      } else if (card.id === 2) {
        new Modal(document.getElementById('myModal')).show();
      } else {
        console.log(card.title);
      }
    }
  },
  data() {
    return {
      images: [
        { src: '/img/Slide1.jpg', title: 'Big News!!', description: 'Neptune has finally launched' },
        { src: '/img/Slide2.jpg', title: 'Neptune Secure', description: 'Now with realtime messaging functionality!' },
        { src: '/img/Slide3.jpg', title: 'A Secure Conversational Resource', description: 'With over 4 users, Neptune is leading source for secure messaging.' },
      ],
      cards: [

      {
        id: 1,
        title: 'Login/Register',
        description: 'Click here to create an account or log in'
      }
     
      ]
    };
  },
};
</script>

<style scoped>

/* Neptune Logo at the top */
   .top-image-container img {
    max-width: 100%;
    max-height: 200px; 
    height: auto; 
    display: block;
    margin: 0 auto; 
  }

  .top-image-container img {
    max-width: 100%; /* Ensures the image is responsive */
    height: auto; /* Maintains aspect ratio */
  }
  .full-screen-background {
    /* Set the background to cover the whole screen */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow:auto;
    
    /* Background styling */
    background-image: url('/img/Homepage_background.png'); /* You can use a color, gradient, or image */
    background-size: cover; /* Ensure the background covers the entire area */
    background-position: center; /* Center the background */
    /* Optionally, you can add more styling for the content within this div */
  }


   /* Login Button */

  .login-button-container {
  position: absolute;
  top: 20px; /* Adjust as needed */
  left: 20px; /* Adjust as needed */
}

.login-button-container button {
  padding: 10px 15px;
  background-color: #007bff; /* Adjust color as needed */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

  .carousel__item {
    position: relative;
    min-height: 500px;
    width: 100%;
    background-color: transparent;
  }

 .carousel__item-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Keeps the image stretched to the container's bounds */
  object-fit: cover; /* Will crop the image to cover the area */
}



.carousel__item-text {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(0%); /* Replace 'translateX(0%)' with the desired X-axis offset */
  width: 100%;
  text-align: left; /* Adjust text alignment to 'left' */
  color: white;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  font-family: 'Avenir';
  font-weight: bold;
}

.carousel__item-text h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.carousel__item-text p {
  font-size: 16px;
  line-height: 1.5;
}

.card {
  transition: transform 0.2s ease-in-out;
  width: 300px;
  height: 400px;
  font-family: 'Avenir';
  font-weight: bold;
  color: white;
}

.card:hover {
  transform: scale(1.1);
}

.neptune-title {
  color: whitesmoke; 
  text-align: center;
  padding-top: 5px;
  font-size: 80px;
  font-family: Verdana; 
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
}

.modal-backdrop {
  z-index: 1000 !important;
}

.modal-content {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  font-family: 'Times New Roman', serif;
}

.logo {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.bg-transparent {
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  margin-top: 1rem; 
  color: whitesmoke; 
  font-family: Verdana; 
  font-size: 16px; 
}

.bg-transparent p {
  font-weight: bold;
  /* Creating an outline effect with text-shadow */
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.8),  
     1px -1px 0 rgba(0, 0, 0, 0.8),
    -1px  1px 0 rgba(0, 0, 0, 0.8),
     1px  1px 0 rgba(0, 0, 0, 0.8);
}




.carousel__item img {
  border-radius: 10px;
}

.carousel__item-text {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}

.card {
  background: linear-gradient(145deg, #0056b3, #0096ff);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
}

.paragraph-box {
  font-family: 'Arial', sans-serif;
  padding: 30px;
}

</style>
