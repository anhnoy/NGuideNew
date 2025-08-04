<template>
  <div class="lg:w-[1280px] w-full mx-auto lg:pt-10 lg:pb-[120px]">
    <div class="items-center hidden space-x-2 lg:flex lg:pb-10">
      <router-link to="/" class="flex items-center">
        <span
          class="mdi mdi-home-outline text-[#152123] text-base"
          title="Home"
        ></span>
      </router-link>
      <span class="mdi mdi-chevron-right text-[#5E5F61] text-base"></span>
      <span class="text-[#152123] text-sm font-normal"
        >위치기반 서비스 이용약관</span
      >
    </div>
    <div class="lg:w-[1100px] px-[16px] lg:px-0 mx-auto mt-5 lg:mt-0">
      <h1 class="font-bold text-[#152123] lg:text-[30px] text-center lg:mb-10">
        위치기반 서비스 이용약관
      </h1>
      <div class="space-y-1 lg:space-y-1">
        <h1 class="text-[#152123] lg:text-base font-bold py-2">제1조 (목적)</h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          본 약관은 오토앤 주식회사(이하 “회사”라고 합니다)가 서비스 이용약관에
          동의한 자(이하 “회원”또는 “개인위치정보주체”이라고 합니다)의
          개인위치정보를 수집하고, 「위치정보의 보호 및 이용 등에 관한
          법률」(이하 “위치정보법”이라 합니다)의 규정에 따라 회사가 운영하는
          웹사이트 및 어플리케이션(이하”당사 플랫폼”)에서 제공하는
          위치기반서비스(이하”서비스”라고 합니다.)를 이용함에 있어 회사와
          개인위치정보주체(회원)간의 권리·의무 및 기타 필요한 사항을 규정함을
          목적으로 합니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제2조(이용약관의 효력 및 변경)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 본 약관은 당사 플랫폼에서 본 서비스를 이용하는 회원 또는
          개인위치정보주체가 본 약관에서 정의하는 소정의 절차에 따라
          동의함으로써 효력이 발생합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회원이 온라인에서 본 약관의 "동의하기" 버튼을 클릭하였을 경우 본
          약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한
          것으로 봅니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 회사는 위치정보의 보호 및 이용 등에 관한 법률, 콘텐츠산업 진흥법,
          전자상거래 등에서의 소비자보호에 관한 법률, 소비자기본법, 약관의
          규제에 관한 법률 등 관련법령을 위배하지 않는 범위에서 본 약관을 개정할
          수 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ④ 회사가 약관을 개정할 경우에는 기존 약관과 개정약관 및 개정약관의
          적용일자, 개정사유를 명시하여 10일전부터 적용일 이후 상당한 기간 동안
          공지하고, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 30일 전부터
          적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에 게시하거나
          회원에게 음성 또는 전자적 형태(SMS등)로 약관 개정 사실을 발송하여
          고지합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ⑤ 회사의 전항에 따른 게시 및 통지 후에도 회원이 개정약관 적용일까지
          개정약관에 대해 동의 또는 거부의 의사표시를 하지 않을 때에는 회원이
          해당개정약관에 동의한 것으로 봅니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ⑥ 회원이 개정약관에 동의하지 않을 경우 (회사 또는) 회원은 이용계약을
          해지할 수 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ⑦ 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 당사 플랫폼 초기
          화면에 개시하거나 기타의 방법으로 공지합니다.
        </p>
        <span class="text-[#152123] text-sm font-medium"
          >제3조(관계법령의 적용)</span
        >
        본 약관은 신의성실의 원칙에 따라 공정하게 적용하며, 본 약관에 명시되지
        아니한 사항에 대하여는 관계법령 또는 상관례에 따릅니다.
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제4조(서비스의 내용 및 개인위치정보의 보유)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사는 직접 위치정보를 수집하거나 위치정보사업자로부터 위치정보를
          전달받아 아래와 같은 위치기반서비스를 제공합니다.
        </p>
        <!-- table -->
        <div class="my-3">
          <table>
            <thead>
              <tr>
                <th class="p-3">서비스 명</th>
                <th>수집방법</th>
                <th>서비스 내용 및 (보유)목적</th>
                <th>개인위치정보 보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-2">앤가이드</td>
                <td class="p-2">GPS가 탑재된 전용 단말기</td>
                <td class="p-2">
                  단말 위치에 따른 오픈채팅 및 여행정보 서비스 제공, 고객 위치
                  찾기
                </td>
                <td class="p-2">
                  고객의 개인위치정보의 수집 목적을 달성 후 파기 단, 관련 법령에
                  근거가 있는 경우 그 기간동안 보유
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회사는 「위치정보의 보호 및 이용 등에 관한 법률」 제16조제2항에 따라
          위치정보 수집·제공사실 확인자료를 자동 기록·보존하며, 해당 자료는
          1년간 보관합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 회사는 개인위치정보의 수집 또는 제공목적을 달성한 때에는 제2항의
          위치정보 수집·제공사실 확인자료를 제외한 개인위치정보를 즉시
          파기합니다. 다만, 다른 법률에 따라 보유하여야 하거나 회원이
          개인위치정보의 보유에 별도로 동의한 경우에는 회원이 동의한 때로부터
          최대 1년간 이를보유할 수 있습니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제5조(서비스 내용변경 통지 등)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사는 서비스 내용을 변경하거나 종료하는 경우 회원의 등록된 전자우편
          주소로 이메일을 통하거나, 회원이 기재한 핸드폰 번호로 문자메세지를
          통하여 서비스 내용의 변경 사항 또는 종료를 통지할 수 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1항의 경우, 서비스 내용 변경을 불특정 다수인을 상대로 통지를 할 필요가
          있다고 회사가 판단할 때에는 회사의 플랫폼 등에 공지사항을 통하여
          회원들에게 통지할 수 있습니다.
        </p>

        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제6조(서비스 제한 및 중지)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사는 아래 각 호의 1에 해당하는 사유가 발생한 경우 회원의 서비스
          이용을 제한하거나 중지할 수 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1. 회원이 당사 서비스 운영을 고의 또는 중과실로 방해하는 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          2. 서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          3. 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을
          경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          4. 국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로
          서비스 이용에 지장이 있는 때
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          5. 기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이
          부적당하다고 인정하는 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한 때에는
          그 사유 및 제한기간 등을 회원에게 알려야 합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 회사가 전항에 따른 게시 및 통지를 할 수 없는 부득이한 사유가 있는
          경우 사후에 게시 및 통지할 수 있습니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제7조(개인위치정보의 이용 또는 제공)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는
          미리 약관에 명시한 후 개인위치정보주체의 동의를 얻어야 합니다. 단,
          회사는 영업방침에 따라 본 이용약관 제4조의 “서비스”의 제공을 중단할 수
          있으며, “서비스” 중단기간 동안에는 본 이용약관의 동의를 득하였더라도
          위치정보를 수집하지 않고 “서비스” 재개 시 수집 및 이용합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회사는 상호, 주소, 전화번호 그 밖의 연락처를 회원이 쉽게 알 수
          있도록 서비스화면에 게시하며 약관의 내용은 회원이 연결화면을 통하여 볼
          수 있도록 합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 회사는 위치정보 이용·제공 사실의 확인을 요청된 민원이 있는 경우,
          민원을 처리하기 위해 해당 민원에 관련된 위치정보를 기록, 보존하며 해당
          자료는 1년간 보관합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ④ 회사는 개인위치정보 주체의 동의 없이 당해 개인위치정보주체의
          개인위치정보를 제3자에게 제공하지 아니하며, 제3자 제공 서비스를
          제공하는 경우에는 제공받는 자 및 제공 목적을 사전에
          개인위치정보주체에게 고지하고 동의를 받습니다. 단, 법령의 규정에
          의하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의
          요구가 있는 경우는 예외로 합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ⑤ 회사는 개인위치정보를 회원이 지정하는 제3자에게 제공하는 경우에는
          개인위치정보를 수집한 당해 통신 단말장치로 매회 회원에게 제공받는 자,
          제공 일시 및 제공목적을 즉시 통보합니다. 단, 아래 각 호의 1에 해당하는
          경우에는 회원이 미리 지정한 전자우편주소로 통보할 수 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1. 개인위치정보를 수집한 당해 통신 단말 장치가 문자, 음성 또는 영상의
          수신기능을 갖추지 아니한 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          2. 회원이 온라인 게시 등의 방법으로 통보할 것을 미리 요청한 경우
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제8조(개인위치정보주체의 권리 및 행사방법)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회원은 회사에 대하여 언제든지 개인위치정보 수집·제공에 대한 동의의
          전부 또는 일부를 철회할 수 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회원은 회사에 대하여 언제든지 개인위치정보 수집의 일시적인 중지를
          요구할 수 있고, 회사는 이를 거절할 수 없으며 이를 위한 기술적 수단을
          갖추고 있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 회원은 회사에 대하여 아래 각 호의 자료에 대한 열람 또는 고지를
          요구할 수 있고, 해당 자료에 오류가 있는 경우에는 그 정정을 요구할 수
          있습니다. 이 경우 회사는 정당한 사유 없이 회원의 요구를 거절할 수
          없습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1. 본인에 대한 위치정보 수집·제공사실 확인자료
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          2. 본인의 개인위치정보가 다른 법률 규정에 의하여 제3자에게 수집·제공된
          이유 및 내용
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ④ 회원은 제1항 내지 제3항의 권리행사를 위해 고객센터 등 약관 부칙에
          기재된 연락처를 이용하여 회사에 그 정보 제공을 요구할 수 있습니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제9조 (법정대리인의 권리)
        </h1>
        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사가 14세 미만 아동으로부터 개인위치정보를 수집·이용 또는
          제공하고자 하는 경우에는 그 법정대리인의 동의를 얻어야 하고, 다음 각
          호의 어느 하나에 해당하는 방법으로 법정대리인이 동의했는지를
          확인합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1. 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를
          표시하도록 하고 회사가 그 동의 표시를 확인했음을 법정대리인의 휴대전화
          문자메시지로 알리는 방법
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          2. 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를
          표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를
          제공받는 방법
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          3. 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를
          표시하도록 하고 법정대리인의 휴대전화 본인인증 등을 통해 본인 여부를
          확인하는 방법
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          4. 동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나, 우편 또는
          팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후
          제출하도록 하는 방법
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          5. 동의 내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의의
          의사표시가 적힌 전자우편을 전송받는 방법
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          6. 전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나
          인터넷주소 등 동의 내용을 확인할 수 있는 방법을 안내하고 재차 전화
          통화를 통하여 동의를 얻는 방법
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          7. 그 밖에 개인정보 수집 매체의 특성상 동의 내용을 전부 표시하기
          어려운 경우 법정대리인에게 동의 내용을 확인할 수 있는
          방법(인터넷주소·사업장 전화번호 등)을 안내
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회사는 14세 미만의 아동의 개인위치정보 또는 위치정보 이용·제공사실
          확인자료를 이용약관에 명시 또는 고지한 범위를 넘어 이용하거나
          제3자에게 제공하고자 하는 경우에는 14세 미만의 아동과 그 법정대리인의
          동의를 받아야 합니다. 단, 아래의 경우는 제외합니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1. 통계작성, 학술연구 또는 시장조사를 위하여 특정 개인을 알아볼 수
          없는 형태로 가공하여 제공하는 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          2. 위치정보 및 위치기반서비스 제공에 따른 요금정산을 위하여 위치정보
          이용, 제공사실 확인 자료가 필요한 경우
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 회사는 개인정보 수집 매체의 특성상 동의 내용을 전부 표시하기 어려운
          경우 법정대리인에게 동의 내용을 확인할 수 있는 방법(인터넷 주소·사업자
          전화번호 등)을 안내할 수 있습니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제10조 (8세 이하의 아동 등의 보호를 위한 위치정보 이용)
        </h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          ① 다음 각 호의 어느 하나에 해당하는 사람(이하 “8세 이하의 아동 등”이라
          한다)의 보호의무자가 8세 이하의 아동 등의 생명 또는 신체의 보호를
          위하여 8세 이하의 아동 등의 개인위치정보의 수집·이용 또는 제공에
          동의하는 경우에는 본인의 동의가 있는 것으로 봅니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">1. 8세 이하의 아동</p>
        <p class="text-[#5E5F61] text-sm font-normal">2. 피성년후견인</p>
        <p class="text-[#5E5F61] text-sm font-normal">
          3. 「장애복지법」 제2조 제2항 제2호에 따른 정신적 장애를 가진
          사람으로서 「장애인고용촉진 및 직업재활법」 제2조 제2호에 따른
          중증장애인에 해당하는 사람(「장애인복지법」 제32조에 따라 장애인
          등록을 한 사람만 해당한다)
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          ② 8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의
          이용 또는 제공에 동의를 하고자 하는 보호의무자는 서면동의서에
          보호의무자임을 증명하는 서면을 첨부하여 당사에 제출하여야 합니다.
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          ③ 보호의무자는 8세 이하의 아동 등의 개인위치정보 이용 또는 제공에
          동의하는 경우 제8조에 규정된 개인위치정보주체 권리의 전부를 행사할 수
          있습니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제11조 (위치정보관리책임자의 지정)
        </h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          회사는 위치정보를 적절히 관리․보호하고 개인위치정보주체의 불만을
          원활히 처리할 수 있도록 실질적인 책임을 질 수 있는 지위에 있는 자를
          위치정보관리책임자로 지정해 운영합니다.
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          1. 소속: 오토앤 주식회사
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          2. 책임자: 이재엽 본부장
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          3. 연락처: 031-689-3314
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          4. 이메일: jay@auton.kr
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">제12조(손해배상)</h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사가 위치정보의 보호 및 이용 등에 관한 법률 제15조 내지 제26조의
          규정을 위반한 행위로 회원에게 손해가 발생한 경우 회원은 회사에 대하여
          손해배상 청구를 할 수 있습니다. 이 경우 회사는 고의,과실이 없음을
          입증하지 못하는 경우 책임을 면할 수 없습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회원이 본 약관의 규정을 위반하여 회사에 손해가 발생한 경우 회사는
          회원에 대하여 손해배상을 청구할 수 있습니다. 이 경우 회원은 고의
          과실이 없음을 입증하지 못하는 경우 책임을 면할 수 없습니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">제13조(면책)</h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여
          회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          1. 천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          2. 서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의
          고의적인 서비스 방해가 있는 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          3. 회원의 귀책사유로 서비스 이용에 장애가 있는 경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          4. 제1호 내지 제3호를 제외한 기타 회사의 고의·과실이 없는 사유로 인한
          경우
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회사는 서비스 및 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성
          등에 대해서는 보증을 하지 않으며 이로 인해 발생한 이용자의 손해에
          대하여는 책임을 부담하지 아니합니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제14조(준거법 및 재판관할)
        </h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          ① 본 약관은 대한민국법령에 의하여 규정되고 이행됩니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회원 및 법정대리인의 권리와 그 행사방법은 제소 당시의 이용자의
          주소에 의하며, 주소가 없는 경우에는 거소를 관할하는 지방법원의
          전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지
          않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제15조(분쟁의 조정 및 기타)
        </h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          ① 회사는 위치정보와 관련된 분쟁에 대해 당사자간 협의가 이루어지지
          아니하거나 협의를 할 수 없는 경우에는 「위치정보의 보호 및 이용 등에
          관한 법률」 제28조의 규정에 의해 방송통신위원회에 재정을 신청할 수
          있습니다.
        </p>
        <p class="text-[#5E5F61] text-sm font-normal">
          ② 회사 또는 회원은 위치정보와 관련된 분쟁에 대해 당사자간 협의가
          이루어지지 아니하거나 협의를 할 수 없는 경우에는 「개인정보보호법」
          제43조의 규정에 의한 개인정보분쟁조정위원회에 조정을 신청할 수
          있습니다
        </p>
        <h1 class="text-[#152123] lg:text-base font-bold py-2">
          제16조(회사의 연락처)
        </h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          회사의 상호 및 주소 등은 다음과 같습니다.
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          1. 상 호: 오토앤 주식회사
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">2. 대표자: 최찬욱</p>

        <p class="text-[#5E5F61] text-sm font-normal">
          3. 주소: 경기 안양시 만안구 전파로 24번길 63 오토앤주식회사
        </p>

        <p class="text-[#5E5F61] text-sm font-normal">
          4. 대표전화: 1644-7160D
        </p>

        <h1 class="text-[#152123] lg:text-base font-bold py-2">부 칙</h1>

        <p class="text-[#5E5F61] text-sm font-normal">
          제1조(시행일) 이 약관은 2024년 11월 01일부터 시행한다.
        </p>
      </div>
    </div>
    <div class="flex justify-center my-10 lg:mt-20">
      <button
        @click="goBack()"
        class="lg:w-[200px] lg:h-[56px] w-[120px] h-[40px] bg-white rounded-[10px] text-[#152123] border-[#152123] text-sm font-bold border-[1px] cursor-pointer"
      >
        이전
      </button>
    </div>
  </div>
</template>
<script>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  window.history.length > 1 ? window.history.back() : navigateTo("/");
};
</script>
<style scoped>
table {
  width: auto;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
}

th {
  background: #c2bcbc;
  color: #152123;
  font-size: 14px;
  font-weight: medium;
  text-align: center;
  border: 1px solid #e6e6e6;
}

td {
  background: white;
  border: 1px solid #e6e6e6;
  text-align: center;
  color: #5e5f61;
  font-size: 12px;
  font-weight: normal;
}
</style>
