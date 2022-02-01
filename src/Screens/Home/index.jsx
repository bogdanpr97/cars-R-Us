import { useContext } from 'react';
import { DataContext } from '../../Context';
import './styles.scss';

function Home() {
  const { getBestAndWorstSeller, removeSalesPerson } = useContext(DataContext);
  const { bestSeller, worstSeller } = getBestAndWorstSeller();

  return (
    <div className="home-container">
      <div className="header-text">Home</div>
      <div className="category-container">
        <span className="category-title">Best Seller :</span>
        <div className="seller-name">{bestSeller?.firstName} {bestSeller?.lastName}</div>
      </div>
      <div className="category-container">
        <span className="category-title">Worst Seller :</span>
        <div className="seller-name">{worstSeller?.firstName} {worstSeller?.lastName}</div>
      </div>
      <div className="remove-button" onClick={() => removeSalesPerson(worstSeller?.id)}>Remove Worst Seller</div>
    </div>
  );
}

export default Home;
