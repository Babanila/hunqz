import {
    MessageSquare,
    CheckCircle2,
    XCircle,
} from 'lucide-react';

import { formatDate } from '../../lib/formatters';
import { Review } from "../../types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 mb-6 bg-gray-50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">
              {review.reviewer_name || 'Anonymous'}
            </p>

            {review.vote === 1 ? (
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Positive
              </span>
            ) : review.vote === -1 ? (
              <span className="flex items-center gap-1 text-red-500 text-sm">
                <XCircle className="w-4 h-4" />
                Negative
              </span>
            ) : null}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {formatDate(review.updated_at)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">
        {review.comment}
      </p>

      {review.reply && (
        <div className="mt-6 ml-4 border-l-2 border-gray-200 pl-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MessageSquare className="w-4 h-4" />
            Reply
          </div>

          <p className="mt-2 text-gray-700">
            {review.reply.text}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {formatDate(review.reply.updated_at)}
          </p>
        </div>
      )}
    </div>
  );
}
