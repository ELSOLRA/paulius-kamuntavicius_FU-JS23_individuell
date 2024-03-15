const Dots = () => {
    const maxDots = 100;
    const dots = '.'.repeat(maxDots);

    return <div className="dots">{dots}</div>;
};

export default Dots;