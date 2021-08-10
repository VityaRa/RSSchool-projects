import { Car } from '../components/models';
import { getRandomColor } from './generateColor';

export const generateCar = (): Car => {
  const carMarks = [
    'BMW',
    'Mazda',
    'Tesla',
    'Ferrari',
    'Honda',
    'Lamborgini',
    'Mercedes-Benz',
    'Renault',
    'Skoda',
    'Subaru',
    'Volvo',
  ];

  const carModels = [
    'Alpheon',
    'Aranos',
    'Arcadia',
    'Chairman',
    'Lestar',
    'Matiz',
    'Racer',
    'Windstorm',
    'Veritraz',
    'Royal',
    '02 (E10)',
    '1-Series',
    '1M',
    '2-Series',
    '2000 C/CS',
    '3/15',
    '315',
    '326',
    'AB',
    'CD',
  ];

  const randNumberMark = Math.floor(Math.random() * carMarks.length);
  const randNumberModel = Math.floor(Math.random() * carModels.length);
  return {
    name: `${carMarks[randNumberMark]} ${carModels[randNumberModel]}`,
    color: getRandomColor(),
  };
};
