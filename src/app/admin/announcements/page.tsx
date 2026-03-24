'use client';

import { useState } from 'react';

export default function AnnouncementsManagementPage() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        status: 'draft' as 'draft' | 'published',
        priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
        expiresAt: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('✅ Announcement created successfully');
                setFormData({
                    title: '',
                    content: '',
                    status: 'draft',
                    priority: 'normal',
                    expiresAt: '',
                });
                setShowForm(false);
            } else {
                setMessage(`❌ ${data.error}`);
            }
        } catch (error) {
            setMessage('❌ Error creating announcement');
        } finally {
            setSubmitting(false);
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'border-red-400 bg-red-50';
            case 'high':
                return 'border-orange-400 bg-orange-50';
            case 'normal':
                return 'border-blue-400 bg-blue-50';
            case 'low':
                return 'border-gray-400 bg-gray-50';
            default:
                return 'border-gray-400 bg-gray-50';
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Announcements Management</h1>
                <p className="text-gray-600 mt-2">Create and manage platform-wide announcements</p>
            </div>

            {message && (
                <div className={`rounded-lg p-4 ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + Create New Announcement
                </button>
            )}

            {showForm && (
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Announcement</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Announcement title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Announcement content"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                            <input
                                type="datetime-local"
                                name="expiresAt"
                                value={formData.expiresAt}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {submitting ? 'Creating...' : 'Create Announcement'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={`rounded-lg p-6 border-2 ${getPriorityColor('urgent')}`}>
                <h3 className="font-semibold text-red-900 mb-2">📢 Announcement Management Features</h3>
                <ul className="text-red-700 list-disc list-inside">
                    <li>Create urgent, high, normal, or low priority announcements</li>
                    <li>Set expiry dates for time-limited announcements</li>
                    <li>Publish or save as draft</li>
                    <li>Announcements appear on homepage and dashboard</li>
                    <li>Support for platform-wide notifications</li>
                </ul>
            </div>
        </div>
    );
}
