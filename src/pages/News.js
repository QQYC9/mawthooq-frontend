import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendar, FaUser, FaEye, FaTag, FaSearch, FaFilter } from 'react-icons/fa';

const NewsContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const NewsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: var(--primary-blue);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--gray-600);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SearchFilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 3rem;
    border: 2px solid var(--gray-200);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(9, 60, 119, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--white);
  cursor: pointer;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const NewsCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const NewsImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, var(--primary-blue), var(--primary-green));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  
  .news-category {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: var(--primary-blue);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const NewsCardContent = styled.div`
  padding: 1.5rem;
`;

const NewsTitle = styled.h3`
  color: var(--primary-blue);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  color: var(--gray-600);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--gray-500);
    font-size: 0.8rem;
  }
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--secondary-blue);
  }
`;

const FeaturedNews = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  margin-bottom: 3rem;
`;

const FeaturedHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: var(--primary-blue);
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-600);
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainFeatured = styled.div`
  .featured-image {
    height: 300px;
    background: linear-gradient(45deg, var(--primary-blue), var(--primary-green));
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  .featured-title {
    color: var(--primary-blue);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.3;
  }
  
  .featured-excerpt {
    color: var(--gray-600);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .featured-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--gray-500);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const SideFeatured = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .side-news {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-50);
    border-radius: 0.5rem;
    transition: background 0.2s ease;
    
    &:hover {
      background: var(--light-blue);
    }
    
    .side-image {
      width: 80px;
      height: 60px;
      background: linear-gradient(45deg, var(--primary-blue), var(--primary-green));
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    
    .side-content {
      flex: 1;
      
      .side-title {
        color: var(--primary-blue);
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
        line-height: 1.3;
      }
      
      .side-date {
        color: var(--gray-500);
        font-size: 0.8rem;
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--gray-200);
    background: var(--white);
    color: var(--gray-700);
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--primary-blue);
      color: var(--white);
      border-color: var(--primary-blue);
    }
    
    &.active {
      background: var(--primary-blue);
      color: var(--white);
      border-color: var(--primary-blue);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const News = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockNews = [
      {
        id: 1,
        title: 'مشروع العقارات الفاخرة الجديد في الروضة',
        excerpt: 'تم إطلاق مشروع عقاري فاخر جديد في منطقة الروضة بصنعاء بقيمة استثمارية تصل إلى 280,000,000 ريال يمني.',
        category: 'مشاريع جديدة',
        author: 'فريق موثوق',
        date: '2024-06-15',
        image: 'alrawdah-project.jpg',
        featured: true
      },
      {
        id: 2,
        title: 'تقرير الربع الثاني: نمو 25% في الاستثمارات',
        excerpt: 'حققت منصة موثوق نمواً بنسبة 25% في الربع الثاني من عام 2024، مع زيادة في عدد المستثمرين.',
        category: 'تقارير مالية',
        author: 'قسم التحليلات',
        date: '2024-06-14',
        image: 'report.jpg',
        featured: true
      },
      {
        id: 3,
        title: 'نجاح مشروع الطاقة المتجددة',
        excerpt: 'تم إكمال مشروع الطاقة المتجددة بنجاح وحقق عوائد استثمارية تجاوزت التوقعات بنسبة 47%.',
        category: 'نجاحات',
        author: 'فريق المشاريع',
        date: '2024-06-13',
        image: 'energy.jpg',
        featured: true
      },
      {
        id: 4,
        title: 'تحديثات جديدة على المنصة',
        excerpt: 'تم إطلاق تحديثات جديدة على منصة موثوق تشمل تحسينات في واجهة المستخدم وأدوات تحليل متقدمة.',
        category: 'تحديثات',
        author: 'فريق التقنية',
        date: '2024-06-12',
        image: 'update.jpg',
        featured: false
      },
      {
        id: 5,
        title: 'تعاون مع كاك بنك',
        excerpt: 'أعلنت منصة موثوق عن تعاون استراتيجي مع كاك بنك لتسهيل عمليات الاستثمار والتحويلات المالية للمستخدمين.',
        category: 'شراكات',
        author: 'قسم العلاقات',
        date: '2024-06-11',
        image: 'kak-bank.png',
        featured: false
      },
      {
        id: 6,
        title: 'دليل الاستثمار للمبتدئين',
        excerpt: 'أصدرت منصة موثوق دليلاً شاملاً للاستثمار للمبتدئين يتضمن نصائح وإرشادات مهمة.',
        category: 'تعليمي',
        author: 'فريق التعليم',
        date: '2024-06-10',
        image: 'guide.jpg',
        featured: false
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setFeaturedNews(mockNews.filter(item => item.featured));
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const categories = ['all', ...Array.from(new Set(news.map(item => item.category)))];

  if (isLoading) {
    return (
      <NewsContainer>
        <NewsContent>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            جاري التحميل...
          </div>
        </NewsContent>
      </NewsContainer>
    );
  }

  return (
    <NewsContainer>
      <NewsContent>
        <NewsHeader>
          <h1>الأخبار والتحديثات</h1>
          <p>اطلع على آخر الأخبار والتحديثات في عالم الاستثمار</p>
        </NewsHeader>

        <SearchFilterBar>
          <SearchInput>
            <input
              type="text"
              placeholder="البحث في الأخبار..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </SearchInput>
          <FilterSelect
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'جميع الفئات' : category}
              </option>
            ))}
          </FilterSelect>
        </SearchFilterBar>

        {featuredNews.length > 0 && (
          <FeaturedNews>
            <FeaturedHeader>
              <h2>الأخبار المميزة</h2>
              <p>أهم الأخبار والتحديثات</p>
            </FeaturedHeader>

            <FeaturedGrid>
              <MainFeatured>
                <div className="featured-image">
                  {featuredNews[0].image && (featuredNews[0].image.endsWith('.png') || featuredNews[0].image.endsWith('.jpg') || featuredNews[0].image.endsWith('.jpeg') || featuredNews[0].image.endsWith('.svg')) ? (
                    <img src={`/images/${featuredNews[0].image}`} alt={featuredNews[0].title} style={{maxHeight: '100%', maxWidth: '100%', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem'}} />
                  ) : (
                    featuredNews[0].image
                  )}
                </div>
                <h3 className="featured-title">{featuredNews[0].title}</h3>
                <p className="featured-excerpt">{featuredNews[0].excerpt}</p>
                <div className="featured-meta">
                  <span><FaUser /> {featuredNews[0].author}</span>
                  <span><FaCalendar /> {new Date(featuredNews[0].date).toLocaleDateString('ar-SA')}</span>
                  <span><FaTag /> {featuredNews[0].category}</span>
                </div>
                <ReadMoreButton to={`/news/${featuredNews[0].id}`}>
                  اقرأ المزيد
                  <FaEye />
                </ReadMoreButton>
              </MainFeatured>

              <SideFeatured>
                {featuredNews.slice(1, 4).map((item) => (
                  <div key={item.id} className="side-news">
                    <div className="side-image">
                      {item.image && (item.image.endsWith('.png') || item.image.endsWith('.jpg') || item.image.endsWith('.jpeg') || item.image.endsWith('.svg')) ? (
                        <img src={`/images/${item.image}`} alt={item.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.25rem'}} />
                      ) : (
                        item.image
                      )}
                    </div>
                    <div className="side-content">
                      <div className="side-title">{item.title}</div>
                      <div className="side-date">
                        {new Date(item.date).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </div>
                ))}
              </SideFeatured>
            </FeaturedGrid>
          </FeaturedNews>
        )}

        <NewsGrid>
          {paginatedNews.map((item, index) => (
            <NewsCard
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewsImage>
                <span className="news-category">{item.category}</span>
                {item.image && (item.image.endsWith('.png') || item.image.endsWith('.jpg') || item.image.endsWith('.jpeg') || item.image.endsWith('.svg')) ? (
                  <img src={`/images/${item.image}`} alt={item.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem'}} />
                ) : (
                  item.image
                )}
              </NewsImage>
              
              <NewsCardContent>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsExcerpt>{item.excerpt}</NewsExcerpt>
                
                <NewsMeta>
                  <div className="meta-item">
                    <FaUser />
                    {item.author}
                  </div>
                  <div className="meta-item">
                    <FaCalendar />
                    {new Date(item.date).toLocaleDateString('ar-SA')}
                  </div>
                </NewsMeta>
                
                <ReadMoreButton to={`/news/${item.id}`}>
                  اقرأ المزيد
                  <FaEye />
                </ReadMoreButton>
              </NewsCardContent>
            </NewsCard>
          ))}
        </NewsGrid>

        {totalPages > 1 && (
          <Pagination>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              السابق
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              التالي
            </button>
          </Pagination>
        )}
      </NewsContent>
    </NewsContainer>
  );
};

export default News; 