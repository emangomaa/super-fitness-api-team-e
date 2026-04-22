export interface FindAllOptions {
  where?: string; 
  params?: any[]; 
  orderBy?: string; 
  page?: number;
  limit?: number;
    orderDirection?: 'ASC' | 'DESC';
  select?: string; 
}