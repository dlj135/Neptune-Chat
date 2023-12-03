<template>
  <!--Background-->
  <div class="full-screen-background">

  <!--Legal Model-->
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" data-bs-backdrop="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">Legal Information</h5>
        </div>
        <div class="modal-body">
          <p>Various graphic assets taken from <a href="https://www.freepik.com/free-vector/halftone-background-with-circles_13295064.htm#query=website%20background&position=2&from_view=keyword&track=ais&uuid=1e020c6d-d1ae-48ea-bf3c-07c571085acb">Freepik</a></p>
          <p>Other Legal stuff should go here if needed.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

    <!--Logo-->
    <div class="container d-flex justify-content-center mt-4">
      <img src="../assets/neptune_logo_tran.png" alt="Logo" class="img-fluid" />
    </div>

    <!--Text below image-->
    <div class="bg-transparent mt-1">
      <h1 style="font-family: Arial; font-size: 32px; color: #007bff;">Introducing Neptune</h1>
      <p style="font-family: Verdana; font-size: 16px; color: whitesmoke;">A cutting edge messenging app with cybersecurity and user modularity at the front of its design philosophy.</p>
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
        <div class="col-md-6" style="border: 2px solid #007bff; border-radius: 10px;">
          <div class="paragraph-box" style="background-color: black; color: white; padding: 20px;">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatum accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>



<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import Modal from 'bootstrap/js/dist/modal';

export default {
  name: 'LandingPage',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods: {
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
        { src: '/img/Slide1.jpg', title: 'Cutting Edge Cybersecurity business', description: 'We are doing some cool stuff here' },
        { src: '/img/Slide1.jpg', title: 'Image Title 2', description: 'Image description 2' },
        { src: '/img/Slide1.jpg', title: 'Image Title 3', description: 'Image description 3' },
      ],
      cards: [
        {
          id: 1,
          title: 'Login/Register',
          description: 'Click here to create an account or log in'
        },
        {
          id: 2,
          title: 'Info/Legal',
          description: 'Click here for boring stuff'
        }
      ]
    };
  },
};
</script>

<style scoped>
  .full-screen-background {
    /* Set the background to cover the whole screen */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow:auto;
    
    /* Background styling */
    background-image: url('/public/img/Homepage_background.jpg'); /* You can use a color, gradient, or image */
    background-size: cover; /* Ensure the background covers the entire area */
    background-position: center; /* Center the background */
    /* Optionally, you can add more styling for the content within this div */
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
  height: 100%;
  object-fit: cover;
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

.modal-backdrop {
  z-index: 1000 !important;
}
</style>