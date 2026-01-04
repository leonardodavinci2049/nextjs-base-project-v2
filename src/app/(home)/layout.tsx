import Header02 from "@/components/header/Header02";

const Homelayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header02 />
      <div>{children}</div>
    </>
  );
};

export default Homelayout;
