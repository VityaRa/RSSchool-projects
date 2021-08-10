import { Garage } from '../components/garage/garage';
import { Top } from '../components/top/top';

export type Pages = 'garage' | 'winners' | string;
export type PageClass = Garage | Top;
