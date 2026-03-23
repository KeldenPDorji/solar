export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
    meta?: {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
    };
}
