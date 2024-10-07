import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">
          Invoice Shark &copy; {new Date().getFullYear()}
        </p>
        <p>Created by Joakim Vu with Next.js, Xata and Clerk</p>
      </Container>
    </footer>
  );
};

export default Footer;
