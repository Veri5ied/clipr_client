import Link from "next/link";

const TopNavigation = () => {
  return (
    <div className="topnavigation">
      <div className="topnavigation__container App__container">
        <div className="topnavigation__items">
          <Link href="/">Clipr</Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
