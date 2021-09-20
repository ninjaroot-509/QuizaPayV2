
import React, { useState, useEffect, useRef } from 'react'
import request from '../Components/Common/HttpRequests'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
// import OwlCarousel from 'react-owl-carousel';
import useProduits from '../state/produit/hooks/useProduits';
import { getUser } from '../Components/Common/Auth/Sessions';
import moment from 'moment';

const MarketPlace = () => {
    const [produit, isLoadingproduit, setProduits] = useProduits();


      useEffect(() => {
        if (!produit.list || produit.list.length === 0) {
          setProduits();
        }
        console.log(produit?.list)
      }, [produit, setProduits]);

      const user = getUser()

    return (
        <>
      <div className="content-grid">
        <div className="section-banner">
          <img className="section-banner-icon" src="https://quizapay.com/static/assets/img/banner/marketplace-icon.png" alt="marketplace-icon"/>
        
          <p className="section-banner-title">Marketplace</p>
        
          <p className="section-banner-text">Le meilleur endroit pour la communauté d'acheter vos produits en toute securit&eacute;!</p>
        </div>

        <div className="section-header">
          <div className="section-header-info">
            <p className="section-pretitle">Parcourir les produits</p>
          </div>
        </div>

        <div className="section-filters-bar v4">
          <div className="section-filters-bar-actions">
            <form className="form">
              <div className="form-item split">
                <div className="form-input small">
              <label htmlFor="items-search">Rechercher ici..</label>
              <input type="text" id="items-search" name="items_search"/>
            </div>
        
                <button className="button primary">
                  <svg className="icon-magnifying-glass">
                <use xlinkHref="#svg-magnifying-glass"></use>
              </svg>
                </button>
              </div>
            </form>
          </div>
        
          <div className="section-filters-bar-actions">
            <form className="form">
              <div className="form-item split medium">
                <div className="form-select small">
              <label htmlFor="items-filter-category">Filtrer par</label>
              <select id="items-filter-category" name="items_filter_category">
                <option value="0">Date publiée</option>
                <option value="1">Prix</option>
              </select>
                  <svg className="form-select-icon icon-small-arrow">
                <use xlinkHref="#svg-small-arrow"></use>
              </svg>
                </div>

                <button className="button primary">Appliquer des filtres</button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-3-9 small-space">

          <div className="marketplace-content">
            <div className="grid grid-3-3-3 centered">


            {produit?.list?.map((item)=>
              <div className="product-preview" key={item.id}>
                <a href="#soon">
              <figure className="product-preview-image liquid">
                <img src="img/marketplace/items/01.jpg" alt="item-01"/>
              </figure>
            </a>

                <div className="product-preview-info">
                  <p className="text-sticker">
                    {item.prix_avec_reduction?
                    <>
                      <span className="highlighted">HTG</span> {item.prix_avec_reduction}
                    <span style={{
                        padding: 5,
                        color: 'red',
                        opacity: 0.5
                    }}><del>{item.prix}</del></span>
                    </>
                    :
                    <>
                      <span className="highlighted">HTG</span> {item.prix}
                    </>
                    }
                  </p>

                  <p className="product-preview-title"><a href="#soon">{item.title}</a></p>

                  <p className="product-preview-category digital"><a href="#">{item.category_display}</a></p>

                  <p className="product-preview-text">{item.description_court}</p>
                </div>

                <div className="product-preview-meta">
                  <div className="product-preview-author">
                    <a className="product-preview-author-image user-avatar micro no-border" href="#">
                        <div className="user-avatar-content">
                          <div style={{display: 'flex',justifyContent: 'center'}}>
                            <img src={item.author_photo} style={{width: 25,borderRadius: 10}}/>
                            </div>
                        </div>
                    </a>

                    <p className="product-preview-author-title">Posté par</p>

                    <p className="product-preview-author-text"><a href="#">{item.author_last_name} {item.author_first_name}</a></p>
                  </div>

                  <div className="rating-list">
                    <div className="rating filled">
                      <svg className="rating-icon icon-star">
                    <use xlinkHref="#svg-star"></use>
                  </svg>
                    </div>

                    <div className="rating filled">
                      <svg className="rating-icon icon-star">
                    <use xlinkHref="#svg-star"></use>
                  </svg>
                    </div>

                    <div className="rating filled">
                      <svg className="rating-icon icon-star">
                    <use xlinkHref="#svg-star"></use>
                  </svg>
                    </div>

                    <div className="rating">
                      <svg className="rating-icon icon-star">
                    <use xlinkHref="#svg-star"></use>
                  </svg>
                    </div>

                    <div className="rating">
                      <svg className="rating-icon icon-star">
                    <use xlinkHref="#svg-star"></use>
                  </svg>
                    </div>
                  </div>
                </div>
              </div>
              )}
              
              
              
              </div>

            <div className="section-pager-bar-wrap align-right">
              <div className="section-pager-bar">
                <div className="section-pager">
                  <div className="section-pager-item active">
                    <p className="section-pager-item-text">01</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">02</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">03</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">04</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">05</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">06</p>
                  </div>
                </div>

                <div className="section-pager-controls">
                  <div className="slider-control left disabled">
                    <svg className="slider-control-icon icon-small-arrow">
                  <use xlinkHref="#svg-small-arrow"></use>
                </svg>
                  </div>

                  <div className="slider-control right">
                    <svg className="slider-control-icon icon-small-arrow">
                  <use xlinkHref="#svg-small-arrow"></use>
                </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}
export default MarketPlace;