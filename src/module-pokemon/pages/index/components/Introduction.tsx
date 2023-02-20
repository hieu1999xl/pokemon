import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const Introduction = () => {
  const { isAnimate } = useSelector((state: RootState) => ({
    isAnimate: state.pokemon.data.isAnimate,
  }));

  return (
    
    <div className="container">
    <div className="row">
      <div className="col s12">
        <div>
          <div className="pokeball-background">
            <svg width={387} height={394} viewBox="0 0 387 394" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M322.607 199.291C303.385 240.288 256.532 262.31 211.508 249.183C166.485 236.057 138.808 192.306 144.629 147.402L49.41 119.641C31.2678 215.555 89.091 311.649 185.251 339.684C281.411 367.719 381.699 317.722 418.062 227.12L322.607 199.291Z" fill="#F1F0F0" />
              <path d="M218.928 224.173C257.103 235.302 297.032 213.515 308.113 175.51C319.193 137.504 297.228 97.6724 259.053 86.5425C220.878 75.4127 180.949 97.1997 169.868 135.205C158.788 173.211 180.753 213.043 218.928 224.173Z" fill="#F1F0F0" />
              <path d="M156.902 111.87C178.188 76.0456 221.814 57.6545 263.898 69.9242C305.983 82.1938 332.89 121.149 331.471 162.765L428.453 191.04C446.596 95.1264 388.772 -0.967323 292.73 -28.9682C196.57 -57.0033 96.1647 -7.04063 59.919 83.5951L156.902 111.87Z" fill="#F1F0F0" />
            </svg>
          </div>
          <h4>Pokemones</h4>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Introduction;
