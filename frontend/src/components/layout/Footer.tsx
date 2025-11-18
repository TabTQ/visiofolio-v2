export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} StarT3Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
