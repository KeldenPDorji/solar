export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Registration {
    id: string;
    eventId: string;
    userId: string;
    status: RegistrationStatus;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegistrationWithDetails extends Registration {
    event: {
        id: string;
        title: string;
        slug: string;
        startDate: Date;
        endDate: Date;
    };
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
