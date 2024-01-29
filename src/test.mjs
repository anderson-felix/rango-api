import axios from 'axios';

const data = [
  {
    name: 'Melancia Splash',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Melancia, morango e menta.',
    price: '13.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Smoothie de Berry Burst',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Morango, mirtilo, framboesa e iogurte natural.',
    price: '12.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Suco Antioxidante de Romã',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Romã, maçã, cenoura e limão.',
    price: '14.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Coco Dream',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Água de coco, abacaxi, banana e espinafre.',
    price: '13.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Maçã Verde e Pepino Fresco',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Maçã verde, pepino, aipo e limão.',
    price: '11.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Suco de Beterraba Energizante',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Beterraba, cenoura, maçã e gengibre.',
    price: '12.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Mango Tango',
    store_id: 'caabcba5-1df5-4c88-b1ed-70dc0bbf8cc5',
    description: 'Manga, laranja, cenoura e hortelã.',
    price: '14.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Energia Tropical',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Abacaxi, manga, espinafre e água de coco.',
    price: '10.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Detox Verde',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Pepino, maçã verde, gengibre e limão.',
    price: '12.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Cítrico Refrescante',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Laranja, limão, hortelã e água.',
    price: '11.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Melancia Splash',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Melancia, morango e menta.',
    price: '13.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Smoothie de Berry Burst',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Morango, mirtilo, framboesa e iogurte natural.',
    price: '12.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Suco Antioxidante de Romã',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Romã, maçã, cenoura e limão.',
    price: '14.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Coco Dream',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Água de coco, abacaxi, banana e espinafre.',
    price: '13.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Maçã Verde e Pepino Fresco',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Maçã verde, pepino, aipo e limão.',
    price: '11.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Suco de Beterraba Energizante',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Beterraba, cenoura, maçã e gengibre.',
    price: '12.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Mango Tango',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Manga, laranja, cenoura e hortelã.',
    price: '14.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Nhoque de Batata Doce com Molho de Tomate',
    store_id: '82fb890d-e4f0-48c3-b9a5-b79b82a82509',
    description: 'Nhoque feito com batata doce, servido com molho de tomate caseiro.',
    price: '25.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Fettuccine de Abóbora com Pesto de Nozes',
    store_id: '82fb890d-e4f0-48c3-b9a5-b79b82a82509',
    description: 'Fettuccine feito de abóbora com pesto de nozes e queijo parmesão.',
    price: '27.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Ravióli de Espinafre e Ricota',
    store_id: '82fb890d-e4f0-48c3-b9a5-b79b82a82509',
    description: 'Ravióli recheado com espinafre e ricota, acompanhado de molho de tomate.',
    price: '29.50',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Penne Integral com Molho de Abacate',
    store_id: '82fb890d-e4f0-48c3-b9a5-b79b82a82509',
    description: 'Penne integral com molho cremoso de abacate, tomate e manjericão.',
    price: '26.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Spaghetti de Trigo Sarraceno com Legumes',
    store_id: '82fb890d-e4f0-48c3-b9a5-b79b82a82509',
    description: 'Spaghetti de trigo sarraceno com legumes frescos e azeite de oliva.',
    price: '24.90',
    image: 'store/e70d49O02N86F.png',
  },

  {
    name: 'Espaguete de Abobrinha com Molho de Tomate',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Espaguete de abobrinha com molho de tomate fresco e manjericão.',
    price: '22.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Macarrão Integral com Pesto de Espinafre',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Macarrão integral com pesto de espinafre, nozes e queijo parmesão.',
    price: '24.50',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Massa de Lentilhas com Legumes Grelhados',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Massa de lentilhas com abobrinha, berinjela, pimentão e tomate grelhados.',
    price: '26.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Lasanha de Berinjela e Abobrinha',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Camadas de berinjela e abobrinha grelhadas, molho de tomate e queijo.',
    price: '28.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Salada de Macarrão com Pesto de Manjericão',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Macarrão de trigo integral, pesto de manjericão, tomate cereja e queijo feta.',
    price: '23.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Wrap de Frango com Abacate',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Tortilha integral recheada com frango grelhado, abacate, alface e tomate.',
    price: '16.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Iogurte com Granola e Frutas Frescas',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Iogurte natural, granola caseira, morangos e banana fatiada.',
    price: '14.50',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Tigelas de Smoothie de Frutas',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Smoothie bowl de morango, banana, kiwi, granola e sementes de chia.',
    price: '15.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Hummus com Palitos de Vegetais',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Hummus caseiro acompanhado de palitos de cenoura, pepino e aipo.',
    price: '13.50',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Ovos Cozidos com Abacate',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Ovos cozidos, abacate fatiado, pimenta preta e uma pitada de sal marinho.',
    price: '17.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Wrap Vegano de Falafel',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Wrap vegano com falafel, homus, vegetais frescos e molho tahine.',
    price: '18.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Sanduíche de Frango Grelhado com Abacaxi',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Pão integral com peito de frango grelhado, abacaxi, alface e maionese de iogurte.',
    price: '16.50',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Bowl de Açaí com Granola e Frutas',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Açaí puro com granola caseira, banana, morangos e coco ralado.',
    price: '19.90',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Sanduíche Aberto de Salmão Defumado',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Fatias de pão integral com salmão defumado, cream cheese, pepino e rúcula.',
    price: '21.50',
    image: 'store/e70d49O02N86F.png',
  },
  {
    name: 'Bolinhos de Quinoa com Molho de Iogurte',
    store_id: 'f192836b-8a66-485b-8cc2-fd5bd886ce0c',
    description: 'Bolinhos de quinoa assados, acompanhados de molho de iogurte com ervas.',
    price: '15.90',
    image: 'store/e70d49O02N86F.png',
  },
];

(async () => {
  for (const item of data) {
    try {
      await axios.post(`http://localhost:3000/store/menu_item/register`, item);
    } catch (error) {
      console.log(JSON.stringify({ error }, null, 4));
    }
  }
})();
