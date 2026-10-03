# Topgap

Ứng dụng thử nghiệm chiến thuật kèo đấu đường trên cho League of Legends, sử dụng Next.js App Router, TypeScript strict, HeroUI, Tailwind CSS và next-intl.

## Chạy dự án

Yêu cầu Node.js 24. Các bài kiểm tra dùng khả năng chạy TypeScript của Node.

```sh
npm ci
npm run dev
```

Trên PowerShell có ExecutionPolicy chặn `npm.ps1`, dùng `npm.cmd` thay cho `npm`.

Sao chép `.env.example` thành `.env.local` và đặt `NEXT_PUBLIC_SITE_URL` bằng origin production thực tế trước khi build. Giá trị phải là HTTP(S) origin, không có đường dẫn, query hay fragment. Nếu chưa cấu hình, ứng dụng không xuất canonical/hreflang URL hoặc URL trong sitemap.

## Cấu trúc

- `src/app`: route, layout, metadata, robots và sitemap. Các trang hiện tại được dựng sẵn cho `/vi` và `/en`.
- `src/features/matchup/model`: kiểu dữ liệu, fixture mẫu theo ngôn ngữ, trạng thái tương tác và danh mục asset có nguồn Data Dragon.
- `src/features/matchup/components`: Arena, Legends và các phần loadout, kế hoạch lính, nên làm/cần tránh, hồi chiêu, ngưỡng sức mạnh.
- `src/features/matchup/routes.ts`: đường dẫn POC dùng chung.
- `src/components`: điều khiển theme và ngôn ngữ dùng chung.
- `src/i18n` và `messages`: routing và bản dịch Việt/Anh.
- `src/lib`: cấu hình origin và metadata dùng chung.
- `tests`: kiểm tra chính sách metadata, dữ liệu mẫu, asset và sự đồng bộ bản dịch.

Fixture được chọn trên server theo locale; component nhận dữ liệu của ngôn ngữ hiện tại. Legends giữ phần khung trang ở server, còn spell picker và các điều khiển dùng client component. Theme dùng một `next-themes` provider cho toàn ứng dụng.

Ưu tiên HeroUI và Tailwind khi mở rộng UI. CSS Modules hiện có giữ các lớp khung game, overlay ảnh, pseudo-element và theme token kế thừa giữa nhiều phần giao diện; không tạo stylesheet mới cho UI thông thường. Kiểm tra toàn bộ ảnh trong `public/images/references/` trước khi sửa giao diện.

## Kiểm tra

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

Kiểm tra HTML và HTTP bằng hai terminal:

```sh
npm run start -- --port 3100
npm run verify:routes
```

`TEST_BASE_URL` đổi địa chỉ server kiểm tra. Nếu build có `NEXT_PUBLIC_SITE_URL`, đặt cùng giá trị khi chạy `verify:routes` để kiểm tra canonical, hreflang, sitemap và robots. Dùng `npm run format` để định dạng code.

Các route `matchup-arena` và `matchup-reference` là POC có `noindex, follow`, được loại khỏi sitemap. Dữ liệu chiến thuật là fixture, không phải hướng dẫn đã xác minh theo patch hiện tại. Arena chưa có dữ liệu kèo đảo chiều và hiển thị thông báo khi đổi bên.

Nguồn asset và ghi chú về thiết kế nằm trong [MATCHUP-POCS.md](MATCHUP-POCS.md). Cần kiểm tra tương tác, responsive và Lighthouse trong trình duyệt khi có môi trường kết nối.
