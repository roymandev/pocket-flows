import { Box, Center, HStack, Heading, Image, Text } from "native-base";
import Illustration1 from "../assets/images/illustration_onboarding_1.svg";
import Illustration3 from "../assets/images/illustration_onboarding_3.svg";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import PaginationPills from "./PaginationPills";

const PAGE_WIDTH = Dimensions.get("window").width;

const data = [
  {
    title: "Gain total control of your money",
    body: "Become your own money manager and make every cent count",
    image: <Illustration1 width="100%" />,
  },
  {
    title: "Know where your money goes",
    body: "Track your transaction easily, with categories and financial report ",
    image: (
      <Image
        source={require("../assets/images/illustration_onboarding_2.png")}
        alt="Illustration Gain total control of your money"
        resizeMode="contain"
      />
    ),
  },
  {
    title: "Planning ahead",
    body: "Setup your budget for each category so you in control",
    image: <Illustration3 width="100%" />,
  },
];

const OnboardingCarousel = () => {
  const [index, setIndex] = useState(0);
  const carousel = useRef<ICarouselInstance>(null);
  const indexChangedRef = useRef(false);

  const onPillPressed = (index: number) => {
    if (!carousel.current) return;
    setIndex(index);
    indexChangedRef.current = true;

    carousel.current.scrollTo({
      index: index,
      animated: true,
      onFinished: () => (indexChangedRef.current = false),
    });
  };

  return (
    <Box flexGrow={1}>
      <HStack flexGrow={1}>
        <Carousel
          ref={carousel}
          data={data}
          renderItem={({ item, index }) => (
            <CarouselItem item={item} key={index} />
          )}
          width={PAGE_WIDTH}
          onProgressChange={(_, progressIndex) => {
            // Don't change index if already changed
            if (indexChangedRef.current) return;

            const currentIndex = Math.round(progressIndex);
            if (currentIndex !== index) {
              setIndex(currentIndex > data.length - 1 ? 0 : currentIndex);
            }
          }}
          pagingEnabled={true}
          autoPlay
          autoPlayInterval={4000}
        />
      </HStack>

      <PaginationPills
        length={3}
        my={8}
        currentPage={index}
        onPillPressed={onPillPressed}
      />
    </Box>
  );
};

type CarouselItemProps = {
  item: (typeof data)[0];
};

const CarouselItem = ({ item }: CarouselItemProps) => {
  return (
    <Box flexGrow={1}>
      <Center flexGrow={1}>{item.image}</Center>

      <Center maxWidth={290} mx="auto" h={150}>
        <Heading fontSize={32} textAlign="center" mb={4}>
          {item.title}
        </Heading>
        <Text fontSize={16} textAlign="center" color="light.20">
          {item.body}
        </Text>
      </Center>
    </Box>
  );
};

export default OnboardingCarousel;
