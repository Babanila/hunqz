import axios from 'axios';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import testData from '../data/test_data.json';

import { ApiClient } from './client';
import { Picture } from './types';

const mockGet = vi.fn();
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: mockGet,
    })),
    isAxiosError: vi.fn(),
  },
}));

const mockedAxios = vi.mocked(axios, true);


describe('ApiClient', () => {
  let client: ApiClient;

  beforeEach(() => {
    vi.clearAllMocks();

    mockedAxios.isAxiosError.mockReturnValue(true);

    client = new ApiClient({
      baseUrl: 'https://dummy-api.com',
      apiPath: '/profiles',
      imgPath: '/images',
    });
  });

  describe('getPictureUrl', () => {
    it('should generate correct image url', () => {
      const result = client.getPictureUrl(
        '2ba5a5fbc41fea7fceb186fb44',
      );

      expect(result).toBe(
        'https://dummy-api.com/images/2ba5a5fbc41fea7fceb186fb44.jpg',
      );
    });

    it('should remove leading slash and jpg extension', () => {
      const result = client.getPictureUrl(
        '/2ba5a5fbc41fea7fceb186fb44.jpg',
      );

      expect(result).toBe(
        'https://dummy-api.com/images/2ba5a5fbc41fea7fceb186fb44.jpg',
      );
    });
  });

  describe('withPictureUrls', () => {
    it('should append image urls to pictures', () => {
      const pictures: Picture[] = [
        {
          id: '1',
          owner_id: '41469841',
          url_token: 'token-1',
          width: 300,
          height: 400,
          rating: 'NEUTRAL',
          is_public: true,
        },
      ];

      const result = client.withPictureUrls(pictures);

      expect(result).toEqual([
        {
          id: '1',
          owner_id: '41469841',
          url_token: 'token-1',
          width: 300,
          height: 400,
          rating: 'NEUTRAL',
          is_public: true,
          url: 'https://dummy-api.com/images/token-1.jpg',
        },
      ]);
    });
  });

  describe('fetchProfile', () => {
    it('should return mocked profile data without real API call', async () => {
      mockGet.mockResolvedValueOnce({ data: testData });
      const result = await client.fetchProfile('msescortplus');

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith('/msescortplus');
      expect(result).toEqual(testData);
    });

    it('should throw formatted axios error', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404,
          statusText: 'Not Found',
        },
      };

      mockGet.mockRejectedValueOnce(axiosError);

      vi.mocked(mockedAxios.isAxiosError).mockReturnValue(true);

      await expect(
        client.fetchProfile('unknown-user'),
      ).rejects.toThrow(
        'Failed to fetch profile (404): Not Found',
      );

      expect(mockedAxios.isAxiosError).toHaveBeenCalledWith(
        axiosError,
      );
    });

    it('should throw unknown error', async () => {
      mockGet.mockRejectedValue(
        new Error('Unexpected failure'),
      );

      mockedAxios.isAxiosError.mockReturnValue(
        false,
      );

      await expect(
        client.fetchProfile('unknown-user'),
      ).rejects.toThrow(
        'Unexpected error occurred while fetching profile',
      );
    });
  });

  describe('fetchProfilePictures', () => {
    it('should fetch profile and return pictures with urls', async () => {
      mockGet.mockResolvedValue({ data: testData });

      const pictures = await client.fetchProfilePictures('msescortplus');

      expect(pictures).toEqual([{
        id: 'Lve4CRM',
        owner_id: '41469841',
        url_token: '2ba5a5fbc41fea7fceb186fb44',
        width: 366,
        height: 650,
        rating: 'NEUTRAL',
        comment: 'Adding a new caption123',
        is_public: true,
        url: 'https://dummy-api.com/images/2ba5a5fbc41fea7fceb186fb44.jpg'
      }])
    });
  });
});
