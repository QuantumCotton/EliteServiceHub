import React, { useState } from 'react';
import { useBusinessContext } from '../../contexts/BusinessContext';
import { ServiceCard } from './ServiceCard';
import { Service } from '../../types/service';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { BusinessType } from '../../types/business';
import { cn } from '../../lib/utils';

interface ServiceListProps {
  layout?: 'grid' | 'list';
  showFilters?: boolean;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  layout = 'grid',
  showFilters = true
}) => {
  const { services } = useBusinessContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<BusinessType | 'all'>('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || service.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as BusinessType | 'all')}
          >
            <Select.Trigger className="w-full sm:w-[180px]">
              <Select.Value placeholder="Service type" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">All Services</Select.Item>
              {Object.values(BusinessType).map((type) => (
                <Select.Item key={type} value={type}>
                  {type}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
      )}

      <div
        className={cn(
          'grid gap-6',
          layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No services found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
