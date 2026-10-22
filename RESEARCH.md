# Research: Authentication, Token & Bearer Token

## Authentication
التحقق من هوية المستخدم (إنت مين؟). مختلف عن Authorization (إنت مسموحلك تعمل إيه؟).

## Token
بعد تسجيل الدخول السيرفر بيطلع Token (غالباً JWT) يبعته المستخدم مع كل request بدل الإيميل والباسورد.
السيرفر مش بيخزن session = Stateless Authentication.

شكل الـ JWT: Header.Payload.Signature
- Header: نوع التوكن والخوارزمية (HS256)
- Payload: البيانات (id, role, exp)
- Signature: توقيع بالـ secret للتأكد إن التوكن ما اتعدلش

## Bearer Token
طريقة إرسال التوكن في الـ header:
    Authorization: Bearer <token>
Bearer = "حامل"، أي حد معاه التوكن يعتبر مسموحله، فلازم HTTPS ومدة صلاحية قصيرة.

## Access vs Refresh
| النوع | الاستخدام | المدة |
|---|---|---|
| Access Token | الوصول للـ APIs | 15 دقيقة - ساعة |
| Refresh Token | طلب access جديد | 7 أيام - سنة |

## Prefixes
- Bearer: للمستخدم العادي (secret الـ user)
- System: للأدمن (secret مختلف)

## مميزات وعيوب
- مميزات: Stateless، سريع، مناسب للـ mobile وأكتر من سيرفر
- عيوب: صعب تلغيه قبل ميعاده إلا بـ blacklist، ولو اتسرق يستخدمه أي حد
