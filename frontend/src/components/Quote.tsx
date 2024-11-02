

export const Quote = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8">
      <div className="max-w-md">
        <blockquote className="text-2xl font-semibold mb-4">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </blockquote>
        <div>
          <p className="font-semibold">Jules Winnfield</p>
          <p className="text-gray-600">CEO, Acme Inc</p>
        </div>
      </div>
    </div>
  );
};
