import { FC } from "react";

interface LoadingPopupProps {
  isLoading: boolean;
}

const LoadingPopup: FC<LoadingPopupProps> = ({ isLoading }) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/35 flex items-center justify-center">
      <div className="p-6 bg-white rounded-md"></div>  
    </div>
  );
};

export default LoadingPopup;
