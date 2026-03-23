export type EventType = 'workshop' | 'seminar' | 'training' | 'conference';
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export interface Event {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    eventType: EventType;
    status: EventStatus;
    startDate: Date;
    endDate: Date;
    location?: string;
    maxParticipants?: number;
    registrationDeadline?: Date;
    imageUrl?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface EventWithCreator extends Event {
    createdByUser: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
