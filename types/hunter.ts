export interface HunterVerifyType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    data: {
      data: {
        block: boolean;
        email: string;
        score: number;
        regexp: boolean;
        result: string; // deprecated, use 'status'
        status: string;
        sources: {
          uri: string;
          domain: string;
          extracted_on: string;
          last_seen_on: string;
          still_on_page: boolean;
        }[];
        webmail: boolean;
        gibberish: boolean;
        accept_all: boolean;
        disposable: boolean;
        mx_records: boolean;
        smtp_check: boolean;
        smtp_server: boolean;
        _deprecation_notice: string;
      };
      meta: {
        params: {
          email: string;
        };
      };
    };
    success: boolean;
  };
}

export interface HunterFindType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    data: {
      data: {
        person: {
          id: string;
          bio: string | null;
          geo: {
            [key: string]: string | null | boolean;
            // lat: number | null;
            // lng: number | null;
            // city: string | null;
            // state: string | null;
            // country: string | null;
            // stateCode: string | null;
            // countryCode: string | null;
          };
          name: {
            [key: string]: string | null | boolean;
            // fullName: string | null;
            // givenName: string | null;
            // familyName: string | null;
          };
          site: string | null;
          email: string;
          fuzzy: boolean;
          phone: string | null;
          avatar: string | null;
          github: {
            id: string | null;
            blog: string | null;
            avatar: string | null;
            handle: string | null;
            company: string | null;
            followers: number | null;
            following: number | null;
          };
          twitter: {
            id: string | null;
            bio: string | null;
            site: string | null;
            avatar: string | null;
            handle: string | null;
            location: string | null;
            statuses: number | null;
            favorites: number | null;
            followers: number | null;
            following: number | null;
          };
          activeAt: string;
          facebook: {
            handle: string | null;
          };
          gravatar: {
            urls: string[];
            avatar: string | null;
            handle: string | null;
            avatars: string[];
          };
          linkedin: {
            handle: string | null;
          };
          location: string | null;
          timeZone: string | null;
          indexedAt: string;
          utcOffset: string | null;
          employment: {
            name: string;
            role: string | null;
            title: string | null;
            domain: string;
            subRole: string | null;
            seniority: string | null;
          };
          googleplus: {
            handle: string | null;
          };
          inactiveAt: string | null;
          emailProvider: string;
        };
        company: {
          id: string;
          geo: {
            lat: number | null;
            lng: number | null;
            city: string | null;
            state: string | null;
            country: string | null;
            stateCode: string | null;
            postalCode: string | null;
            streetName: string | null;
            subPremise: string | null;
            countryCode: string | null;
            streetNumber: string | null;
            streetAddress: string | null;
          };
          logo: string;
          name: string;
          site: {
            phoneNumbers: string[];
            emailAddresses: string[];
          };
          tags: string[];
          tech: string[];
          type: string;
          phone: string | null;
          domain: string;
          parent: {
            domain: string | null;
          };
          ticker: string | null;
          metrics: {
            raised: number | null;
            employees: string | null;
            marketCap: number | null;
            alexaUsRank: number | null;
            trafficRank: number | null;
            annualRevenue: number | null;
            fiscalYearEnd: string | null;
            alexaGlobalRank: number | null;
            estimatedAnnualRevenue: number | null;
          };
          twitter: {
            id: string | null;
            bio: string | null;
            site: string | null;
            avatar: string | null;
            handle: string | null;
            location: string | null;
            followers: number | null;
            following: number | null;
          };
          youtube: {
            handle: string | null;
          };
          category: {
            sector: string;
            sicCode: string;
            gicsCode: string;
            industry: string;
            naicsCode: string;
            sic4Codes: string[];
            naics6Codes: string[];
            subIndustry: string;
            industryGroup: string;
            naics6Codes2022: string[];
          };
          facebook: {
            likes: number | null;
            handle: string | null;
          };
          linkedin: {
            handle: string;
          };
          location: string;
          timeZone: string | null;
          indexedAt: string;
          legalName: string;
          utcOffset: string | null;
          crunchbase: {
            handle: string | null;
          };
          description: string;
          foundedYear: number | null;
          identifiers: {
            usEIN: string | null;
          };
          domainAliases: string[];
          emailProvider: string;
          techCategories: string[];
          ultimateParent: {
            domain: string | null;
          };
        };
      };
    };
  };
}
