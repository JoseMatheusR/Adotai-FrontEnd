import { Box, Typography } from "@mui/material";
import { DefaultLayoutHomePage } from "../../components/DefaultLayoutHomePage";
import Carousel, { CarouselSlide } from "../../components/Carousel";
import { BackgroundDecorations } from "../../components/decorations/BackgroundDecorations";
import { useAuthContext } from "../../contexts/authContext";
import { Header } from "../../components/Header";

export const HomePage = () => {
  const { authToken } = useAuthContext();

  const carouselSlides: CarouselSlide[] = [
    {
      image:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Pipoca",
      description:
        "Hamster curioso e cheio de energia. Adora correr na rodinha e guardar comida nas bochechas!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Bidu",
      description:
        "Filhote de cachorro alegre e brincalhão. Está aprendendo a sentar e adora colo.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Luna",
      description:
        "Gatinha filhote esperta e carente. Vive atrás de carinho e brinquedos com penas.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558954350-2bc4ea82347f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Zezé",
      description:
        "Galo imponente e sociável. Ama cantar de manhã e andar pelo quintal com pose.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Tutu",
      description:
        "Porquinho filhote simpático e afetuoso. Ama correr atrás dos irmãos e dormir em cobertores.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Nina",
      description:
        "Coelhinha serena e doce. Ideal para quem busca um animal silencioso e carinhoso.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1548658166-136d9f6a7e76?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Léo",
      description:
        "Mais um filhote encantador esperando por um lar! Cheio de energia e amor para dar.",
    },
    {
      image:
        "https://images.unsplash.com/uploads/141155339325423394b24/03982423?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Rosinha",
      description:
        "Rolinha tranquila e observadora. Gosta de ficar perto de quem cuida bem dela.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?q=80&w=1362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Frida",
      description:
        "Cachorra adulta muito doce e companheira. Já é castrada e sabe se comportar muito bem.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Espinho",
      description:
        "Ouriço adorável e curioso. Apesar das aparências, adora se esconder e receber frutas.",
    },
  ];

  const Layout = authToken ? Header : DefaultLayoutHomePage;

  return (
    <Layout>
      <Box sx={{ position: "relative" }}>
        <BackgroundDecorations />
        <Box>
          <Typography
            fontFamily={"Afacad FLUX"}
            sx={{
              fontSize: "35px",
              textAlign: "center",
              paddingTop: "90px",
              marginBottom: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "25px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <svg
              width="65"
              height="25"
              viewBox="0 0 65 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.6538 2.01851C43.5195 3.11126 48.317 5.93734 52.3149 8.27357C56.2748 10.5721 60.6916 13.0591 62.1003 13.775C64.7656 15.0938 65.3748 15.6591 64.8037 16.2243C64.0041 17.0156 62.7476 16.375 43.4433 5.37213C42.5676 4.84459 41.8441 4.58083 41.8441 4.76923C41.8441 5.48517 45.4232 9.47937 47.3651 10.9112C51.1346 13.662 49.5354 14.5663 43.2529 13.2098C34.1529 11.2504 10.3937 7.25618 10.0129 7.59531C9.82256 7.78372 13.2494 8.91415 19.5699 10.7228C21.4356 11.2504 27.1089 12.5315 32.1349 13.5112C43.786 15.8475 47.7078 17.2794 47.0605 18.9373C46.8701 19.4272 46.299 19.5779 44.6237 19.5779C41.1588 19.6156 32.3252 20.9344 32.3252 21.4243C32.3252 21.575 38.8742 21.9141 46.8701 22.1779C61.6434 22.6301 63.2045 22.8185 63.4711 24.1373C63.6614 25.0793 62.9761 25.1547 57.8359 24.8156C55.2087 24.6272 48.4312 24.3257 42.7579 24.0996C32.706 23.7228 26.5377 23.0446 25.7001 22.2156C25.4336 21.9518 25.4336 21.6504 25.7001 21.1605C26.0047 20.7083 27.9465 20.1431 32.6679 19.1257C36.2851 18.3721 39.3311 17.6562 39.4454 17.5431C39.6738 17.317 39.75 17.317 30.3072 15.3953C16.5619 12.6446 2.20745 8.0098 0.341743 5.8243C-0.457848 4.88227 0.189438 4.12865 1.82669 4.12865C3.34972 4.12865 42.1107 10.4214 42.6818 10.7605C43.4814 11.2881 42.796 10.0823 40.9684 7.85908C37.2751 3.41271 36.1328 1.75474 36.1328 0.888079C36.1328 -0.581486 37.8462 -0.242355 41.6538 2.01851Z"
                fill="black"
              />
            </svg>{" "}
            ENCONTRE UM AMIGO PARA A VIDA TODA{" "}
            <svg
              width="65"
              height="25"
              viewBox="0 0 65 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3462 2.01851C21.4805 3.11126 16.683 5.93734 12.6851 8.27357C8.72522 10.5721 4.30845 13.0591 2.89965 13.775C0.234361 15.0938 -0.374848 15.6591 0.196286 16.2243C0.995873 17.0156 2.25237 16.375 21.5567 5.37213C22.4324 4.84459 23.1559 4.58083 23.1559 4.76923C23.1559 5.48517 19.5768 9.47937 17.6349 10.9112C13.8654 13.662 15.4646 14.5663 21.7471 13.2098C30.8471 11.2504 54.6063 7.25618 54.9871 7.59531C55.1774 7.78372 51.7506 8.91415 45.4301 10.7228C43.5644 11.2504 37.8911 12.5315 32.8651 13.5112C21.214 15.8475 17.2922 17.2794 17.9395 18.9373C18.1299 19.4272 18.701 19.5779 20.3763 19.5779C23.8412 19.6156 32.6748 20.9344 32.6748 21.4243C32.6748 21.575 26.1258 21.9141 18.1299 22.1779C3.35656 22.6301 1.79546 22.8185 1.52893 24.1373C1.33855 25.0793 2.02391 25.1547 7.16412 24.8156C9.79133 24.6272 16.5688 24.3257 22.2421 24.0996C32.294 23.7228 38.4623 23.0446 39.2999 22.2156C39.5664 21.9518 39.5664 21.6504 39.2999 21.1605C38.9953 20.7083 37.0535 20.1431 32.3321 19.1257C28.7149 18.3721 25.6689 17.6562 25.5546 17.5431C25.3262 17.317 25.25 17.317 34.6928 15.3953C48.4381 12.6446 62.7926 8.0098 64.6583 5.8243C65.4578 4.88227 64.8106 4.12865 63.1733 4.12865C61.6503 4.12865 22.8893 10.4214 22.3182 10.7605C21.5186 11.2881 22.204 10.0823 24.0316 7.85908C27.7249 3.41271 28.8672 1.75474 28.8672 0.888079C28.8672 -0.581486 27.1538 -0.242355 23.3462 2.01851Z"
                fill="black"
              />
            </svg>
          </Typography>

          <Carousel slides={carouselSlides}></Carousel>
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
