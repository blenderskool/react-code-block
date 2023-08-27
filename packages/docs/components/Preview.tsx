const Preview = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-200 px-12 py-20 rounded-xl bg-dots preview">
    {children}
  </div>
);

export default Preview;
