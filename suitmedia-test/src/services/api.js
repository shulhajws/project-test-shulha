function generateMockPosts(count) {
  const posts = [];
  
  for (let i = 1; i <= count; i++) {
    posts.push({
      id: i,
      title: i % 2 === 0 
        ? 'Kenali Tingkatan Influencers berdasarkan Jumlah Followers' 
        : 'Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer Marketing',
      published_at: '2022-09-05',
      medium_image: {
        url: `https://picsum.photos/seed/post${i}/400/300`
      }
    });
  }
  
  return posts;
}

const api = {
  fetchPosts: async (params) => {
    const { page, pageSize, sort } = params;
    
    const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error('API returned HTML instead of JSON');
        throw new Error('API returned HTML instead of JSON');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      
      return {
        data: generateMockPosts(pageSize),
        meta: {
          current_page: page,
          from: ((page - 1) * pageSize) + 1,
          last_page: 10,
          per_page: pageSize,
          to: page * pageSize,
          total: 100
        }
      };
    }
  }
};

export default api;